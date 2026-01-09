import { Response } from 'express';
import { supabase } from '../config/database';
import { bookingService } from '../services/booking.service';
import { AuthRequest } from '../middleware/auth';
import { SERVICE_PRICING } from '../utils/constants';
import { calculateBookingPrice, calculateDeposit, generateConfirmationCode } from '../utils/helpers';

export const bookingController = {
  async createBooking(req: AuthRequest, res: Response) {
    try {
      const {
        service_type,
        event_date,
        guest_count,
        location,
        dietary_requirements,
        menu_preferences,
        special_requests,
      } = req.body;

      const pricing = SERVICE_PRICING[service_type as keyof typeof SERVICE_PRICING];
      if (!pricing) {
        return res.status(400).json({ error: 'Invalid service type' });
      }

      if (guest_count > pricing.maxGuests) {
        return res.status(400).json({ error: `Maximum ${pricing.maxGuests} guests for ${service_type} service` });
      }

      const totalPrice = calculateBookingPrice(pricing.basePrice, pricing.perGuestPrice, guest_count);
      const depositAmount = calculateDeposit(totalPrice);

      const confirmationCode = generateConfirmationCode();

      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          user_id: req.user!.id,
          service_type,
          event_date,
          event_duration: 180,
          guest_count,
          location,
          dietary_requirements: dietary_requirements || [],
          menu_preferences: menu_preferences || {},
          special_requests,
          base_price: pricing.basePrice,
          per_guest_price: pricing.perGuestPrice,
          total_price: totalPrice,
          deposit_amount: depositAmount,
          confirmation_code: confirmationCode,
        })
        .select()
        .single();

      if (error) {
        return res.status(400).json({ error: 'Booking creation failed' });
      }

      await bookingService.sendConfirmationEmail(booking.id);

      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Booking creation failed' });
    }
  },

  async getBookings(req: AuthRequest, res: Response) {
    try {
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', req.user!.id)
        .order('event_date', { ascending: false });

      if (error) {
        return res.status(500).json({ error: 'Failed to fetch bookings' });
      }

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  },

  async getBooking(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const { data: booking, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .eq('user_id', req.user!.id)
        .single();

      if (error || !booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch booking' });
    }
  },

  async updateBooking(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const { data: booking, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .eq('user_id', req.user!.id)
        .select()
        .single();

      if (error || !booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update booking' });
    }
  },

  async cancelBooking(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const { data: booking, error } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', req.user!.id)
        .select()
        .single();

      if (error || !booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      await bookingService.sendCancellationEmail(booking.id);

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to cancel booking' });
    }
  },
};
