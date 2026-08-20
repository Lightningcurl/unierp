
import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function getPartners() {
    const supabase = await createClient();
    const { data , error } = await supabase.from("partners").select("*");

    if (error) {
        console.error("could not retrieve partners", error);
        return null;
    }

     return data;
}