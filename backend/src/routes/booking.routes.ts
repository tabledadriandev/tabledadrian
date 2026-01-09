import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { bookingValidator } from '../utils/validators';

const router = Router();

router.use(authenticateToken);

router.get('/', bookingController.getBookings);
router.get('/:id', bookingController.getBooking);
router.post('/', bookingValidator, validateRequest, bookingController.createBooking);
router.patch('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.cancelBooking);

export default router;
