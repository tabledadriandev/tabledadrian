import { body, ValidationChain } from 'express-validator';
import { validatePassword } from '../config/security';

export const registerValidator: ValidationChain[] = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 12 })
    .withMessage('Password must be at least 12 characters')
    .custom((value: string) => {
      if (value) {
        const validation = validatePassword(value);
        if (!validation.valid) {
          throw new Error(validation.errors.join(', '));
        }
      }
      return true;
    }),
  body('full_name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('phone')
    .optional()
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Valid phone number is required'),
];

export const bookingValidator: ValidationChain[] = [
  body('service_type')
    .isIn(['intimate', 'signature', 'luxe', 'bespoke'])
    .withMessage('Invalid service type'),
  body('event_date')
    .isISO8601()
    .withMessage('Valid event date is required')
    .custom((value: string) => {
      const eventDate = new Date(value);
      const now = new Date();
      if (eventDate <= now) {
        throw new Error('Event date must be in the future');
      }
      return true;
    }),
  body('guest_count')
    .isInt({ min: 1, max: 100 })
    .withMessage('Guest count must be between 1 and 100'),
  body('location')
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Location must be between 5 and 500 characters'),
  body('dietary_requirements')
    .optional()
    .isArray()
    .withMessage('Dietary requirements must be an array'),
];

export const paymentValidator: ValidationChain[] = [
  body('booking_id')
    .isUUID()
    .withMessage('Valid booking ID is required'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Valid amount is required'),
];
