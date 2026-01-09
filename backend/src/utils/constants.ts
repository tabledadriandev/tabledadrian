export const SERVICE_PRICING = {
  intimate: {
    basePrice: 350,
    perGuestPrice: 45,
    maxGuests: 6,
  },
  signature: {
    basePrice: 750,
    perGuestPrice: 55,
    maxGuests: 12,
  },
  luxe: {
    basePrice: 1500,
    perGuestPrice: 75,
    maxGuests: 25,
  },
  bespoke: {
    basePrice: 0,
    perGuestPrice: 0,
    maxGuests: 100,
  },
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PAID: 'paid',
  PREPARING: 'preparing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const DEPOSIT_PERCENTAGE = 0.25;
export const CANCELLATION_DEADLINE_DAYS = 7;
