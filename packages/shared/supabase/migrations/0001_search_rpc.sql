CREATE OR REPLACE FUNCTION public.search_donors_nearby(
  search_lat double precision,
  search_lng double precision,
  radius_meters double precision,
  filter_blood_group text DEFAULT NULL,
  filter_city text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  name text,
  blood_group text,
  locality text,
  city text,
  last_donated_at timestamp with time zone,
  is_available_to_donate boolean,
  distance_meters double precision
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.name,
    u.blood_group,
    u.locality,
    u.city,
    u.last_donated_at,
    u.is_available_to_donate,
    CASE 
      WHEN search_lat IS NOT NULL AND search_lng IS NOT NULL THEN
        ST_Distance(u.location, ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326)::geography)
      ELSE NULL
    END AS distance_meters
  FROM public.users u
  WHERE u.is_available_to_donate = true
    AND (filter_blood_group IS NULL OR u.blood_group = filter_blood_group)
    AND (filter_city IS NULL OR u.city ILIKE '%' || filter_city || '%')
    AND (
      search_lat IS NULL OR search_lng IS NULL OR 
      ST_DWithin(u.location, ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326)::geography, radius_meters)
    );
END;
$$;
