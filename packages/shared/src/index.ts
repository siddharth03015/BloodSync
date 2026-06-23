export interface User {
  id: string;
  phone: string;
  name: string;
  blood_group: string;
  gender: string;
  dob: string;
  city: string;
  locality: string;
  pincode: string;
  lat: number;
  lng: number;
  is_available_to_donate: boolean;
  last_donated_at?: string;
  role: string;
  is_verified: boolean;
  created_at: string;
}

export interface BloodRequest {
  id: string;
  requester_id: string;
  blood_group: string;
  units_needed: number;
  hospital_name: string;
  city: string;
  locality: string;
  lat: number;
  lng: number;
  urgency: string;
  status: string;
  created_at: string;
  expires_at?: string;
}

export * from './supabase';

