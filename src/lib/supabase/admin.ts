import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Bypasses RLS. Only use after verifying the requester's authorization yourself.
// Never import from client-rendered code.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
