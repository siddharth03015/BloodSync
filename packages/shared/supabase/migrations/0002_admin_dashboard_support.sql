-- 1. Add `status` column to `chats`
ALTER TABLE public.chats ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- 2. Add RLS policies for admins to UPDATE users and chats.
-- Admins can update any user (e.g. for verification)
CREATE POLICY "Only admins can modify users" 
ON public.users FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.users AS admins
    WHERE admins.id = auth.uid() AND admins.role = 'admin'
  )
);

-- Admins can update any chat (e.g. for resolving reports)
CREATE POLICY "Only admins can modify chats" 
ON public.chats FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.users AS admins
    WHERE admins.id = auth.uid() AND admins.role = 'admin'
  )
);
