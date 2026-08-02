
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_photos TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.artist_photo TO anon, authenticated;

DROP POLICY IF EXISTS "public read portfolio" ON public.portfolio_photos;
DROP POLICY IF EXISTS "public write portfolio" ON public.portfolio_photos;
DROP POLICY IF EXISTS "public delete portfolio" ON public.portfolio_photos;
CREATE POLICY "public read portfolio" ON public.portfolio_photos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public write portfolio" ON public.portfolio_photos FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public delete portfolio" ON public.portfolio_photos FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read artist" ON public.artist_photo;
DROP POLICY IF EXISTS "public write artist" ON public.artist_photo;
DROP POLICY IF EXISTS "public delete artist" ON public.artist_photo;
CREATE POLICY "public read artist" ON public.artist_photo FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public write artist" ON public.artist_photo FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "public delete artist" ON public.artist_photo FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "photos bucket read" ON storage.objects;
DROP POLICY IF EXISTS "photos bucket insert" ON storage.objects;
DROP POLICY IF EXISTS "photos bucket delete" ON storage.objects;
CREATE POLICY "photos bucket read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'photos');
CREATE POLICY "photos bucket insert" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'photos');
CREATE POLICY "photos bucket delete" ON storage.objects FOR DELETE TO anon, authenticated USING (bucket_id = 'photos');
