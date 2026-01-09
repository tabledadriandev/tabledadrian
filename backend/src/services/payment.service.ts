import Stripe from 'stripe';
import { supabase } from '../config/database';
import { stripe } from '../config/stripe';
import { logger } from '../utils/logger';

export class PaymentService {
  async createPaymentIntent(
    bookingId: string,
    amount: number,
    currency: string = 'usd'
  ) {
    try {
      const { data: booking, error } = await supabase
        .from('bookings')
        .select('*, profiles!inner(email, full_name)')
        .eq('id', bookingId)
        .single();

      if (error || !booking) {
        throw new Error('Booking not found');
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        metadata: {
          booking_id: bookingId,
          user_id: booking.user_id,
          service_type: booking.service_type,
          event_date: booking.event_date,
        },
        description: `Table d'Adrian - ${booking.service_type} booking for ${booking.event_date}`,
        receipt_email: booking.profiles.email,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await supabase.from('payments').insert({
        booking_id: bookingId,
        user_id: booking.user_id,
        stripe_payment_intent_id: paymentIntent.id,
        amount,
        currency,
        payment_type: 'deposit',
        status: 'pending',
        stripe_metadata: paymentIntent.metadata,
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      logger.error('Payment Intent creation failed:', error);
      throw error;
    }
  }

  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;
      case 'charge.refunded':
        await this.handleRefund(event.data.object as Stripe.Charge);
        break;
    }
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    const bookingId = paymentIntent.metadata.booking_id;

    await supabase
      .from('payments')
      .update({
        status: 'succeeded',
        stripe_charge_id: paymentIntent.latest_charge as string,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_payment_intent_id', paymentIntent.id);

    await supabase
      .from('bookings')
      .update({
        status: 'paid',
        payment_status: 'paid',
        confirmed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId);

    const { data: booking } = await supabase
      .from('bookings')
      .select('event_date')
      .eq('id', bookingId)
      .single();

    if (booking) {
      await this.updateAvailability(booking.event_date, -1);
    }
  }

  private async handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
    await supabase
      .from('payments')
      .update({
        status: 'failed',
        error_message: paymentIntent.last_payment_error?.message || 'Payment failed',
      })
      .eq('stripe_payment_intent_id', paymentIntent.id);
  }

  private async handleRefund(charge: Stripe.Charge) {
    const { data: payment } = await supabase
      .from('payments')
      .select('booking_id')
      .eq('stripe_charge_id', charge.id)
      .single();

    if (payment) {
      await supabase
        .from('bookings')
        .update({ status: 'refunded' })
        .eq('id', payment.booking_id);
    }
  }

  private async updateAvailability(date: string, change: number) {
    const eventDate = new Date(date);
    const dateStr = eventDate.toISOString().split('T')[0];

    const { data: availability } = await supabase
      .from('chef_availability')
      .select('slots_booked')
      .eq('date', dateStr)
      .single();

    if (availability) {
      await supabase
        .from('chef_availability')
        .update({
          slots_booked: availability.slots_booked + change,
          updated_at: new Date().toISOString(),
        })
        .eq('date', dateStr);
    }
  }

  async processRefund(bookingId: string, amount?: number) {
    const { data: payment } = await supabase
      .from('payments')
      .select('stripe_payment_intent_id, amount')
      .eq('booking_id', bookingId)
      .eq('status', 'succeeded')
      .single();

    if (!payment) {
      throw new Error('No successful payment found for this booking');
    }

    const refundAmount = amount || payment.amount;

    const refund = await stripe.refunds.create({
      payment_intent: payment.stripe_payment_intent_id as string,
      amount: Math.round(refundAmount * 100),
    });

    await supabase.from('payments').insert({
      booking_id: bookingId,
      amount: refundAmount,
      payment_type: 'refund',
      status: 'succeeded',
      stripe_metadata: { refund_id: refund.id },
    });

    return refund;
  }
}

export const paymentService = new PaymentService();
