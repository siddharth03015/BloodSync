-- Add INSERT policy for users table so new registrations can create their profile row
CREATE POLICY "Users can insert own profile" 
ON public.users FOR INSERT 
WITH CHECK (auth.uid() = id);
