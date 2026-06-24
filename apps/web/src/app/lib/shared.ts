// ─── Supabase Client ──────────────────────────────────────

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Make sure you set the environment variables.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : ({
      from: () => ({
        select: () => ({
          limit: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
        })
      })
    } as any);

// ─── Core Types ───────────────────────────────────────────

export interface User {
  id: string;
  phone: string;
  name: string;
  blood_group: BloodGroup;
  gender: string;
  dob: string;
  city: string;
  locality: string;
  pincode: string;
  lat: number;
  lng: number;
  is_available_to_donate: boolean;
  last_donated_at?: string;
  role: 'user' | 'admin';
  is_verified: boolean;
  created_at: string;
}

export interface BloodRequest {
  id: string;
  requester_id: string;
  blood_group: BloodGroup;
  units_needed: number;
  hospital_name: string;
  city: string;
  locality: string;
  lat: number;
  lng: number;
  urgency: 'critical' | 'within_24h' | 'planned';
  status: 'open' | 'fulfilled' | 'expired';
  created_at: string;
  expires_at?: string;
}

export interface RequestNotification {
  id: string;
  request_id: string;
  donor_id: string;
  status: 'pending' | 'sent' | 'seen' | 'responded';
  sent_at: string;
}

export interface Chat {
  id: string;
  request_id?: string;
  user_a_id: string;
  user_b_id: string;
  status: 'active' | 'reported' | 'resolved';
  created_at: string;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  text: string;
  sent_at: string;
  read_at?: string;
}

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  lat: number;
  lng: number;
  source: string;
  verified: boolean;
}

export interface DonationCamp {
  id: string;
  title: string;
  organizer_name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  date_start: string;
  date_end: string;
  contact_phone: string;
  created_by_admin_id?: string;
  status: 'upcoming' | 'approved' | 'pending' | 'completed' | 'cancelled';
}

// ─── Blood Group Utilities ────────────────────────────────

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export const ALL_BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const BLOOD_COMPATIBILITY: Record<BloodGroup, BloodGroup[]> = {
  'A+':  ['A+', 'A-', 'O+', 'O-'],
  'A-':  ['A-', 'O-'],
  'B+':  ['B+', 'B-', 'O+', 'O-'],
  'B-':  ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+':  ['O+', 'O-'],
  'O-':  ['O-'],
};

export function getCompatibleDonors(recipientGroup: BloodGroup): BloodGroup[] {
  return BLOOD_COMPATIBILITY[recipientGroup] || [];
}

export function getCanDonateTo(donorGroup: BloodGroup): BloodGroup[] {
  return ALL_BLOOD_GROUPS.filter(recipient => 
    BLOOD_COMPATIBILITY[recipient].includes(donorGroup)
  );
}
