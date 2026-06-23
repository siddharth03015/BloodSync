-- Enable PostGIS extension for spatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enable UUID extension just in case
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. `users` table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  gender TEXT,
  dob DATE,
  city TEXT,
  locality TEXT,
  pincode TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (
    CASE 
      WHEN lng IS NOT NULL AND lat IS NOT NULL 
      THEN ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
      ELSE NULL
    END
  ) STORED,
  is_available_to_donate BOOLEAN DEFAULT true,
  last_donated_at TIMESTAMP WITH TIME ZONE,
  role TEXT DEFAULT 'user',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for `users` location
CREATE INDEX IF NOT EXISTS users_geo_index ON public.users USING GIST (location);

-- 2. `blood_requests` table
CREATE TABLE IF NOT EXISTS public.blood_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  blood_group TEXT NOT NULL,
  units_needed INTEGER NOT NULL DEFAULT 1,
  hospital_name TEXT NOT NULL,
  city TEXT NOT NULL,
  locality TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (
    CASE 
      WHEN lng IS NOT NULL AND lat IS NOT NULL 
      THEN ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
      ELSE NULL
    END
  ) STORED,
  urgency TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS requests_geo_index ON public.blood_requests USING GIST (location);

-- 3. `request_notifications` table
CREATE TABLE IF NOT EXISTS public.request_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES public.blood_requests(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. `chats` table
CREATE TABLE IF NOT EXISTS public.chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID REFERENCES public.blood_requests(id) ON DELETE CASCADE,
  user_a_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  user_b_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. `messages` table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- 6. `blood_banks` table
CREATE TABLE IF NOT EXISTS public.blood_banks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  pincode TEXT,
  phone TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (
    CASE 
      WHEN lng IS NOT NULL AND lat IS NOT NULL 
      THEN ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
      ELSE NULL
    END
  ) STORED,
  source TEXT,
  verified BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS blood_banks_geo_index ON public.blood_banks USING GIST (location);

-- 7. `donation_camps` table
CREATE TABLE IF NOT EXISTS public.donation_camps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organizer_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (
    CASE 
      WHEN lng IS NOT NULL AND lat IS NOT NULL 
      THEN ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
      ELSE NULL
    END
  ) STORED,
  date_start TIMESTAMP WITH TIME ZONE NOT NULL,
  date_end TIMESTAMP WITH TIME ZONE NOT NULL,
  contact_phone TEXT,
  created_by_admin_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'upcoming'
);

CREATE INDEX IF NOT EXISTS camps_geo_index ON public.donation_camps USING GIST (location);


-----------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-----------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_camps ENABLE ROW LEVEL SECURITY;

-- users: read/update own row only
CREATE POLICY "Users can view own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.users FOR UPDATE 
USING (auth.uid() = id);

-- blood_banks: public read; admin-only write
CREATE POLICY "Blood banks are universally readable" 
ON public.blood_banks FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify blood banks" 
ON public.blood_banks FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- donation_camps: public read; admin-only write
CREATE POLICY "Donation camps are universally readable" 
ON public.donation_camps FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify donation camps" 
ON public.donation_camps FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- blood_requests: public read; insert by requester only
CREATE POLICY "Blood requests are universally readable" 
ON public.blood_requests FOR SELECT 
USING (true);

CREATE POLICY "Users can create blood requests" 
ON public.blood_requests FOR INSERT 
WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update own blood requests" 
ON public.blood_requests FOR UPDATE 
USING (auth.uid() = requester_id);

-- chats: readable only by the two participants
CREATE POLICY "Users can view their chats" 
ON public.chats FOR SELECT 
USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

CREATE POLICY "Users can insert their chats" 
ON public.chats FOR INSERT 
WITH CHECK (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- messages: readable only by the two participants
CREATE POLICY "Users can view messages in their chats" 
ON public.messages FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chats 
    WHERE chats.id = messages.chat_id 
    AND (chats.user_a_id = auth.uid() OR chats.user_b_id = auth.uid())
  )
);

CREATE POLICY "Users can send messages to their chats" 
ON public.messages FOR INSERT 
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM public.chats 
    WHERE chats.id = messages.chat_id 
    AND (chats.user_a_id = auth.uid() OR chats.user_b_id = auth.uid())
  )
);
