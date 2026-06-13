CREATE TABLE public.portfolio_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_photos TO authenticated;
GRANT ALL ON public.portfolio_photos TO service_role;
ALTER TABLE public.portfolio_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view portfolio photos" ON public.portfolio_photos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Portfolio admin can add photos" ON public.portfolio_photos FOR INSERT TO authenticated WITH CHECK (auth.uid() = uploaded_by AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE POLICY "Portfolio admin can edit photos" ON public.portfolio_photos FOR UPDATE TO authenticated USING (lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com') WITH CHECK (lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE POLICY "Portfolio admin can delete photos" ON public.portfolio_photos FOR DELETE TO authenticated USING (lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE OR REPLACE FUNCTION public.update_portfolio_photos_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER update_portfolio_photos_updated_at BEFORE UPDATE ON public.portfolio_photos FOR EACH ROW EXECUTE FUNCTION public.update_portfolio_photos_updated_at();
CREATE POLICY "Portfolio admin can upload files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-photos' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE POLICY "Portfolio admin can update files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-photos' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com') WITH CHECK (bucket_id = 'portfolio-photos' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');
CREATE POLICY "Portfolio admin can delete files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-photos' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'diwakarpandey6611@gmail.com');