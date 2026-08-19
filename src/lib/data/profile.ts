import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserProfile() {
    const supabase = await createClient();

    let data;
    try {
        ({ data } = await supabase.auth.getUser());
    } catch {
        return null;
    }

    if (!data.user) {
        return null;
    }

    const { data: profile, error: profileError } = await supabase.from("profiles").select("full_name").eq("id", data.user.id).single();

    if (profileError) {
        console.error("could not retrieve name", profileError);
        return null;
    }

     return profile?.full_name ?? null;
}