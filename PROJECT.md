# B-Sync

A blood donor network application for India, comprising a Next.js web application and an Expo React Native mobile app.

## Architecture
- **Web App (`apps/web`)**: Next.js 14 using the App Router, built with TypeScript and Tailwind CSS.
- **Mobile App (`apps/mobile`)**: Expo (React Native) application built with TypeScript.
- **Shared Packages (`packages/shared`)**: Shared TypeScript types, utilities, and the API client used by both applications.
- **Backend**: Supabase
  - Postgres with PostGIS for location-based donor matching.
  - Auth for secure authentication.
  - Realtime for chat features.
  - Storage for user avatars and documents.

## Data Model (Supabase Postgres)

- **`users`**:
  - `id`, `phone`, `name`, `blood_group`, `gender`, `dob`, `city`, `locality`, `pincode`, `lat`, `lng`, `is_available_to_donate`, `last_donated_at`, `role`, `is_verified`, `created_at`
- **`blood_requests`**:
  - `id`, `requester_id`, `blood_group`, `units_needed`, `hospital_name`, `city`, `locality`, `lat`, `lng`, `urgency`, `status`, `created_at`, `expires_at`
- **`request_notifications`**:
  - `id`, `request_id`, `donor_id`, `status`, `sent_at`
- **`chats`**:
  - `id`, `request_id`, `user_a_id`, `user_b_id`, `created_at`
- **`messages`**:
  - `id`, `chat_id`, `sender_id`, `text`, `sent_at`, `read_at`
- **`blood_banks`**:
  - `id`, `name`, `address`, `city`, `state`, `pincode`, `phone`, `lat`, `lng`, `source`, `verified`
- **`donation_camps`**:
  - `id`, `title`, `organizer_name`, `address`, `city`, `lat`, `lng`, `date_start`, `date_end`, `contact_phone`, `created_by_admin_id`, `status`

## Build Milestones
1. **Foundation (Current)**: Monorepo setup, placeholder apps, shared package initialization.
2. **Backend Setup**: Provision Supabase project, run DDL scripts for tables, enable PostGIS, configure Row Level Security (RLS).
3. **Authentication**: Implement OTP-based phone login (via Supabase Auth) on both web and mobile.
4. **User Profile & Registration**: Onboarding flow to capture user details (blood group, location, etc.).
5. **Blood Request Workflow**: Ability to create a blood request and find nearby matching donors using PostGIS.
6. **Real-time Chat**: Implement chat feature for donors and requesters to communicate securely.
7. **Blood Banks & Camps Directory**: View list of blood banks and upcoming donation camps.
8. **Polish & Release**: Finalize UI/UX, perform testing, set up CI/CD, prepare for production release.
