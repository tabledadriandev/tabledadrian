export interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: 'client' | 'chef' | 'admin';
  dietary_restrictions: string[];
  health_conditions: string[];
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  service_type: 'intimate' | 'signature' | 'luxe' | 'bespoke';
  event_date: string;
  event_duration: number;
  guest_count: number;
  location: string;
  dietary_requirements: string[];
  menu_preferences: Record<string, any>;
  special_requests: string | null;
  base_price: number;
  per_guest_price: number;
  total_price: number;
  deposit_amount: number;
  status: 'pending' | 'confirmed' | 'paid' | 'preparing' | 'completed' | 'cancelled' | 'refunded';
  payment_status: string;
  confirmation_code: string;
  created_at: string;
  updated_at: string;
  confirmed_at: string | null;
  cancelled_at: string | null;
}

export interface Payment {
  id: string;
  booking_id: string;
  user_id: string;
  stripe_payment_intent_id: string | null;
  stripe_charge_id: string | null;
  amount: number;
  currency: string;
  payment_method: string | null;
  payment_type: 'deposit' | 'full' | 'refund';
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
  stripe_metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
  cuisine: string[];
  meal_type: string | null;
  course_type: string | null;
  suitable_for: string[];
  not_suitable_for: string[];
  dietary_tags: string[];
  allergen_free: string[];
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  difficulty: string | null;
  ingredients: any;
  instructions: any;
  nutrition: any;
  chef_notes: string | null;
  featured: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}
