import { Response } from 'express';
import { stripe, STRIPE_WEBHOOK_SECRET } from '../config/stripe';
import { paymentService } from '../services/payment.service';
import { AuthRequest } from '../middleware/auth';
import { Request } from 'express';

export const paymentController = {
  async createPaymentIntent(req: AuthRequest, res: Response) {
    try {
      const { booking_id, amount } = req.body;

      const result = await paymentService.createPaymentIntent(booking_id, amount);

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Payment intent creation failed' });
    }
  },

  async handleWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'] as string;

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        STRIPE_WEBHOOK_SECRET
      );

      await paymentService.handleWebhook(event);

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({ error: 'Webhook handler failed' });
    }
  },

  async processRefund(req: AuthRequest, res: Response) {
    try {
      const { booking_id, amount } = req.body;

      const refund = await paymentService.processRefund(booking_id, amount);

      res.json({ refund });
    } catch (error) {
      res.status(500).json({ error: 'Refund processing failed' });
    }
  },
};
