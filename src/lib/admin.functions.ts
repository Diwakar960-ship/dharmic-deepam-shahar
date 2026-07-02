import { createServerFn } from "@tanstack/react-start";

const ADMIN_UUID = "00000000-0000-0000-0000-000000000001";

function verify(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("सर्वर कॉन्फ़िगरेशन त्रुटि");
  if (password !== expected) throw new Error("गलत ईमेल या पासवर्ड");
}

function dataUrlToBuffer(dataUrl: string): { buffer: Uint8Array; contentType: string } {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error("अमान्य फ़ाइल");
  const contentType = match[1];
  const base64 = match[2];
  const binary = atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);
  return { buffer, contentType };
}

export const verifyAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const expectedEmail = process.env.ADMIN_EMAIL ?? "";
    if (data.email.trim().toLowerCase() !== expectedEmail.toLowerCase()) {
      throw new Error("गलत ईमेल या पासवर्ड");
    }
    verify(data.password);
    return { ok: true };
  });

export const adminUploadPortfolio = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; dataUrl: string }) => data)
  .handler(async ({ data }) => {
    verify(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { buffer, contentType } = dataUrlToBuffer(data.dataUrl);
    const path = `admin/${crypto.randomUUID()}.jpg`;
    const { error: upErr } = await supabaseAdmin.storage.from("photos").upload(path, buffer, {
      contentType,
      upsert: false,
    });
    if (upErr) throw new Error(upErr.message);
    const { error: insErr } = await supabaseAdmin.from("portfolio_photos").insert({
      storage_path: path,
      uploaded_by: ADMIN_UUID,
      sort_order: Math.floor(Date.now() / 1000),
    });
    if (insErr) {
      await supabaseAdmin.storage.from("photos").remove([path]);
      throw new Error(insErr.message);
    }
    return { ok: true };
  });

export const adminDeletePortfolio = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; id: string; storagePath: string }) => data)
  .handler(async ({ data }) => {
    verify(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.storage.from("photos").remove([data.storagePath]);
    const { error } = await supabaseAdmin.from("portfolio_photos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminUploadArtist = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; dataUrl: string }) => data)
  .handler(async ({ data }) => {
    verify(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { buffer, contentType } = dataUrlToBuffer(data.dataUrl);
    const path = `admin/artist-${crypto.randomUUID()}.jpg`;
    const { error: upErr } = await supabaseAdmin.storage.from("photos").upload(path, buffer, {
      contentType,
      upsert: false,
    });
    if (upErr) throw new Error(upErr.message);

    // Remove previous artist photos (there should be at most one)
    const { data: existing } = await supabaseAdmin
      .from("artist_photo")
      .select("id, storage_path");
    if (existing && existing.length > 0) {
      const paths = existing.map((row) => row.storage_path);
      await supabaseAdmin.storage.from("photos").remove(paths);
      await supabaseAdmin.from("artist_photo").delete().in("id", existing.map((r) => r.id));
    }

    const { error: insErr } = await supabaseAdmin.from("artist_photo").insert({
      storage_path: path,
      uploaded_by: ADMIN_UUID,
    });
    if (insErr) {
      await supabaseAdmin.storage.from("photos").remove([path]);
      throw new Error(insErr.message);
    }
    return { ok: true };
  });
