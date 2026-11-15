import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const saveSettingsFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      ai_model: z.string().optional(),
      gmail_search_query: z.string().optional(),
      sheets_spreadsheet_id: z.string().nullable().optional(),
      sheets_range: z.string().optional(),
      auto_sync: z.boolean().optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("fl_settings")
      .upsert({ user_id: userId, ...data, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    if (error) throw error;
    return { ok: true };
  });

export const getSettingsFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("fl_settings").select("*").eq("user_id", userId).maybeSingle();
    return data ?? { ai_model: "openai/gpt-5.5" };
  });

export const getIntegrationStatusFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: gc } = await supabase.from("fl_google_connections").select("email, scope, updated_at").eq("user_id", userId).maybeSingle();
    const { data: settings } = await supabase.from("fl_settings").select("sheets_spreadsheet_id, sheets_range, gmail_search_query").eq("user_id", userId).maybeSingle();
    return { google: gc ?? null, settings: settings ?? null };
  });

export const disconnectGoogleFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await supabase.from("fl_google_connections").delete().eq("user_id", userId);
    return { ok: true };
  });

/** Return the OAuth URL the user must visit to grant Gmail+Sheets to the app. */
export const buildGoogleOAuthUrlFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ origin: z.string().url() }).parse(d))
  .handler(async ({ data, context }) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) throw new Error("GOOGLE_CLIENT_ID manquant");
    const redirect = `${data.origin}/api/public/feeloo-google/callback`;
    const scope = [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "openid", "email", "profile",
    ].join(" ");
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirect,
      response_type: "code",
      scope,
      access_type: "offline",
      prompt: "consent",
      state: context.userId,
    });
    return { url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}` };
  });