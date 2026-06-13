import { createServerFn } from "@tanstack/react-start";

export interface CloudPortfolioPhoto {
  id: string;
  storagePath: string;
  imageUrl: string;
  createdAt: string;
}

export interface CloudArtistPhoto {
  id: string;
  storagePath: string;
  imageUrl: string;
}

export const getPortfolioPhotos = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("portfolio_photos")
    .select("id, storage_path, created_at")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error("पोर्टफोलियो लोड नहीं हो सका");

  const photos = await Promise.all(
    (data ?? []).map(async (photo) => {
      const { data: signed } = await supabaseAdmin.storage
        .from("photos")
        .createSignedUrl(photo.storage_path, 60 * 60);
      return {
        id: photo.id,
        storagePath: photo.storage_path,
        imageUrl: signed?.signedUrl ?? "",
        createdAt: photo.created_at,
      } satisfies CloudPortfolioPhoto;
    }),
  );

  return photos.filter((photo) => photo.imageUrl);
});

export const getArtistPhoto = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("artist_photo")
    .select("id, storage_path")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error("कलाकार की फ़ोटो लोड नहीं हो सकी");
  if (!data) return null;

  const { data: signed } = await supabaseAdmin.storage
    .from("photos")
    .createSignedUrl(data.storage_path, 60 * 60);
  if (!signed?.signedUrl) return null;

  return {
    id: data.id,
    storagePath: data.storage_path,
    imageUrl: signed.signedUrl,
  } satisfies CloudArtistPhoto;
});