import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  // 1. AuthN — someone has to be logged in.
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2. AuthZ — must be an admin, checked here on the server, not just hidden in the UI.
  // Reading your own row works fine under RLS regardless of role, so this check itself
  // isn't affected by the RLS policy that will otherwise limit visibility below.
  const { data: requester, error: requesterError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (requesterError || requester?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3. Now that the requester is confirmed to be an admin, use the service-role
  // client to bypass RLS — the regular client would otherwise still only return
  // the requester's own row, admin or not.
  const admin = createAdminClient();
  const { data: profiles, error: profilesError } = await admin
    .from("profiles")
    .select("id, full_name, role");

  if (profilesError) {
    console.error("could not list profiles", profilesError);
    return NextResponse.json({ error: "Could not list users" }, { status: 400 });
  }

  return NextResponse.json({ profiles });
}
