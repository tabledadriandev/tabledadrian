import { Router } from 'express';
import express from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authenticateToken } from '../middleware/auth';
import { stripe, STRIPE_WEBHOOK_SECRET } from '../config/stripe';

const router = Router();

router.post('/create-intent', authenticateToken, paymentController.createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);
router.post('/refund', authenticateToken, paymentController.processRefund);

export default router;
