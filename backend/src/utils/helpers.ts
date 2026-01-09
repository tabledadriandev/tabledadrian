import crypto from 'crypto';
import { DEPOSIT_PERCENTAGE } from './constants';

export function generateConfirmationCode(): string {
  return crypto.randomBytes(6).toString('hex').toUpperCase();
}

export function calculateBookingPrice(
  basePrice: number,
  perGuestPrice: number,
  guestCount: number
): number {
  return basePrice + (perGuestPrice * guestCount);
}

export function calculateDeposit(totalPrice: number, percentage: number = DEPOSIT_PERCENTAGE): number {
  return Math.round(totalPrice * percentage * 100) / 100;
}

export function formatCurrency(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}
