import { sendEmail } from '../config/email';
import { supabase } from '../config/database';

export class BookingService {
  async sendConfirmationEmail(bookingId: string) {
    try {
      const { data: booking, error } = await supabase
        .from('bookings')
        .select('*, profiles!inner(email, full_name)')
        .eq('id', bookingId)
        .single();

      if (error || !booking) {
        throw new Error('Booking not found');
      }

      const html = `
        <h1>Booking Confirmation</h1>
        <p>Dear ${booking.profiles.full_name},</p>
        <p>Your booking has been confirmed!</p>
        <p><strong>Confirmation Code:</strong> ${booking.confirmation_code}</p>
        <p><strong>Event Date:</strong> ${new Date(booking.event_date).toLocaleDateString()}</p>
        <p><strong>Service Type:</strong> ${booking.service_type}</p>
        <p><strong>Total Price:</strong> $${booking.total_price}</p>
      `;

      await sendEmail(
        booking.profiles.email,
        'Booking Confirmation - Table d\'Adrian',
        html
      );

      await supabase.from('email_logs').insert({
        user_id: booking.user_id,
        booking_id: bookingId,
        email_type: 'confirmation',
        recipient: booking.profiles.email,
        subject: 'Booking Confirmation',
        status: 'sent',
        sent_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Confirmation email failed:', error);
    }
  }

  async sendCancellationEmail(bookingId: string) {
    try {
      const { data: booking, error } = await supabase
        .from('bookings')
        .select('*, profiles!inner(email, full_name)')
        .eq('id', bookingId)
        .single();

      if (error || !booking) {
        throw new Error('Booking not found');
      }

      const html = `
        <h1>Booking Cancelled</h1>
        <p>Dear ${booking.profiles.full_name},</p>
        <p>Your booking has been cancelled.</p>
        <p><strong>Confirmation Code:</strong> ${booking.confirmation_code}</p>
        <p>If you have any questions, please contact us.</p>
      `;

      await sendEmail(
        booking.profiles.email,
        'Booking Cancelled - Table d\'Adrian',
        html
      );
    } catch (error) {
      console.error('Cancellation email failed:', error);
    }
  }
}

export const bookingService = new BookingService();
