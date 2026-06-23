-- Dummy users for testing PostGIS queries

INSERT INTO auth.users (id, email) VALUES
('11111111-1111-1111-1111-111111111111', 'test1@example.com'),
('22222222-2222-2222-2222-222222222222', 'test2@example.com'),
('33333333-3333-3333-3333-333333333333', 'test3@example.com'),
('44444444-4444-4444-4444-444444444444', 'test4@example.com')
ON CONFLICT DO NOTHING;

INSERT INTO public.users (id, phone, name, blood_group, city, locality, lat, lng, is_available_to_donate, role)
VALUES
-- Delhi donor (Lat: 28.6139, Lng: 77.2090)
('11111111-1111-1111-1111-111111111111', '+919999999991', 'Delhi Admin', 'O+', 'Delhi', 'Connaught Place', 28.6139, 77.2090, true, 'admin'),
-- Mumbai donor (Lat: 19.0760, Lng: 72.8777)
('22222222-2222-2222-2222-222222222222', '+919999999992', 'Mumbai Donor 1', 'B+', 'Mumbai', 'Andheri', 19.0760, 72.8777, true, 'user'),
-- Bangalore donor (Lat: 12.9716, Lng: 77.5946)
('33333333-3333-3333-3333-333333333333', '+919999999993', 'Bangalore Donor 1', 'A+', 'Bangalore', 'Koramangala', 12.9716, 77.5946, true, 'user'),
-- Close to Delhi (Noida) (Lat: 28.5355, Lng: 77.3910)
('44444444-4444-4444-4444-444444444444', '+919999999994', 'Noida Donor', 'O+', 'Noida', 'Sector 15', 28.5355, 77.3910, true, 'user')
ON CONFLICT (phone) DO NOTHING;

-- Pending Blood Banks
INSERT INTO public.blood_banks (name, address, city, state, verified) VALUES
('Test Blood Bank 1', 'Some Address', 'Delhi', 'Delhi', false),
('Test Blood Bank 2', 'Another Address', 'Mumbai', 'Maharashtra', false);

-- Pending Donation Camps
INSERT INTO public.donation_camps (title, organizer_name, address, city, date_start, date_end, status) VALUES
('Summer Blood Drive', 'Red Cross', 'Community Center', 'Bangalore', NOW(), NOW() + interval '1 day', 'pending');

-- Reported Chats
INSERT INTO public.chats (user_a_id, user_b_id, status) VALUES
('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'reported');
