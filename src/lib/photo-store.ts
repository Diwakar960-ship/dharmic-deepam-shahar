// Client-side Supabase photo storage — works on any static host (Netlify, etc.)
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "photos";
const ADMIN_UUID = "00000000-0000-0000-0000-000000000001";

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

function dataUrlToBlob(dataUrl: string): Blob {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error("अमान्य फ़ाइल");
  const contentType = match[1];
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: contentType });
}

async function signedUrl(path: string): Promise<string> {
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60);
  return data?.signedUrl ?? "";
}

export async function fetchPortfolioPhotos(): Promise<CloudPortfolioPhoto[]> {
  const { data, error } = await supabase
    .from("portfolio_photos")
    .select("id, storage_path, created_at")
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error("पोर्टफोलियो लोड नहीं हो सका");

  const photos = await Promise.all(
    (data ?? []).map(async (row) => ({
      id: row.id,
      storagePath: row.storage_path,
      imageUrl: await signedUrl(row.storage_path),
      createdAt: row.created_at,
    })),
  );
  return photos.filter((p) => p.imageUrl);
}

export async function uploadPortfolioPhoto(dataUrl: string): Promise<void> {
  const blob = dataUrlToBlob(dataUrl);
  const path = `admin/${crypto.randomUUID()}.jpg`;
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: blob.type, upsert: false });
  if (upErr) throw new Error(upErr.message);

  const { error: insErr } = await supabase.from("portfolio_photos").insert({
    storage_path: path,
    uploaded_by: ADMIN_UUID,
    sort_order: Math.floor(Date.now() / 1000),
  });
  if (insErr) {
    await supabase.storage.from(BUCKET).remove([path]);
    throw new Error(insErr.message);
  }
}

export async function deletePortfolioPhoto(id: string, storagePath: string): Promise<void> {
  await supabase.storage.from(BUCKET).remove([storagePath]);
  const { error } = await supabase.from("portfolio_photos").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function fetchArtistPhoto(): Promise<CloudArtistPhoto | null> {
  const { data, error } = await supabase
    .from("artist_photo")
    .select("id, storage_path")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error("कलाकार की फ़ोटो लोड नहीं हो सकी");
  if (!data) return null;
  const url = await signedUrl(data.storage_path);
  if (!url) return null;
  return { id: data.id, storagePath: data.storage_path, imageUrl: url };
}

export async function uploadArtistPhoto(dataUrl: string): Promise<void> {
  const blob = dataUrlToBlob(dataUrl);
  const path = `admin/artist-${crypto.randomUUID()}.jpg`;
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: blob.type, upsert: false });
  if (upErr) throw new Error(upErr.message);

  const { data: existing } = await supabase.from("artist_photo").select("id, storage_path");
  if (existing && existing.length > 0) {
    await supabase.storage.from(BUCKET).remove(existing.map((r) => r.storage_path));
    await supabase
      .from("artist_photo")
      .delete()
      .in("id", existing.map((r) => r.id));
  }

  const { error: insErr } = await supabase.from("artist_photo").insert({
    storage_path: path,
    uploaded_by: ADMIN_UUID,
  });
  if (insErr) {
    await supabase.storage.from(BUCKET).remove([path]);
    throw new Error(insErr.message);
  }
}
