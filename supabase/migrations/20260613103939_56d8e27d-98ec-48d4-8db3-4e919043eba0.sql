ALTER TABLE public.portfolio_photos DROP CONSTRAINT IF EXISTS portfolio_photos_storage_path_key;
ALTER TABLE public.portfolio_photos ADD CONSTRAINT portfolio_photos_storage_path_key UNIQUE (storage_path);

CREATE TABLE public.artist_photo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL UNIQUE,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.artist_photo TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artist_photo TO authenticated;
GRANT ALL ON public.artist_photo TO service_role;
ALTER TABLE public.artist_photo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view artist photo" ON public.artist_photo FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Portfolio admin can add artist photo" ON public.artist_photo FOR INSERT TO authenticated WITH CHECK (auth.uid() = uploaded_by AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE POLICY "Portfolio admin can edit artist photo" ON public.artist_photo FOR UPDATE TO authenticated USING (lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com') WITH CHECK (auth.uid() = uploaded_by AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE POLICY "Portfolio admin can delete artist photo" ON public.artist_photo FOR DELETE TO authenticated USING (lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE TRIGGER update_artist_photo_updated_at BEFORE UPDATE ON public.artist_photo FOR EACH ROW EXECUTE FUNCTION public.update_portfolio_photos_updated_at();

CREATE POLICY "Portfolio admin can upload photos bucket files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'photos' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE POLICY "Portfolio admin can update photos bucket files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'photos' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com') WITH CHECK (bucket_id = 'photos' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE POLICY "Portfolio admin can delete photos bucket files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'photos' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');