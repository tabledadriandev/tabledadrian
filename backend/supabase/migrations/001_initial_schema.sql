-- supabase/migrations/001_initial_schema.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'chef', 'admin')),
  dietary_restrictions JSONB DEFAULT '[]',
  health_conditions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Booking statuses
CREATE TYPE booking_status AS ENUM (
  'pending',
  'confirmed',
  'paid',
  'preparing',
  'completed',
  'cancelled',
  'refunded'
);

-- Service types
CREATE TYPE service_type AS ENUM (
  'intimate',
  'signature',
  'luxe',
  'bespoke'
);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  service_type service_type NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  event_duration INTEGER NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count > 0),
  location TEXT NOT NULL,
  
  dietary_requirements JSONB DEFAULT '[]',
  menu_preferences JSONB DEFAULT '{}',
  special_requests TEXT,
  
  base_price DECIMAL(10,2) NOT NULL,
  per_guest_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2) NOT NULL,
  
  status booking_status DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  confirmation_code TEXT UNIQUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  CHECK (event_date > NOW()),
  CHECK (total_price > 0)
);

-- Payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_charge_id TEXT,
  
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  payment_method TEXT,
  payment_type TEXT CHECK (payment_type IN ('deposit', 'full', 'refund')),
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'refunded')),
  
  stripe_metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Availability Calendar
CREATE TABLE public.chef_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  slots_available INTEGER NOT NULL DEFAULT 1,
  slots_booked INTEGER DEFAULT 0,
  is_blocked BOOLEAN DEFAULT FALSE,
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(date),
  CHECK (slots_booked <= slots_available)
);

-- Recipes table
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  
  cuisine TEXT[],
  meal_type TEXT,
  course_type TEXT,
  
  suitable_for TEXT[],
  not_suitable_for TEXT[],
  dietary_tags TEXT[],
  allergen_free TEXT[],
  
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  difficulty TEXT,
  
  ingredients JSONB,
  instructions JSONB,
  nutrition JSONB,
  chef_notes TEXT,
  
  featured BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BMI Calculations
CREATE TABLE public.bmi_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  height_cm DECIMAL(5,2) NOT NULL,
  weight_kg DECIMAL(5,2) NOT NULL,
  bmi DECIMAL(4,2) NOT NULL,
  category TEXT NOT NULL,
  
  body_fat_estimate JSONB,
  recommendations JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email Logs
CREATE TABLE public.email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  booking_id UUID REFERENCES public.bookings(id),
  
  email_type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  subject TEXT,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_event_date ON public.bookings(event_date);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_payments_booking_id ON public.payments(booking_id);
CREATE INDEX idx_payments_stripe_intent ON public.payments(stripe_payment_intent_id);
CREATE INDEX idx_recipes_dietary_tags ON public.recipes USING GIN(dietary_tags);
CREATE INDEX idx_recipes_suitable_for ON public.recipes USING GIN(suitable_for);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bmi_calculations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
