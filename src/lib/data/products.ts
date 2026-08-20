import "server-only";
import { Product } from "@/tsdrills/erp_domain";
import { createClient } from "@/lib/supabase/server";

export async function getProducts(): Promise<Product[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select("id, name, price, stock:stock_qty");

    if (error) {
        console.error("could not retrieve products", error);
        return [];
    }

    return data;
}

export async function getProduct(id: string): Promise<Product | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("products")
        .select("id, name, price, stock:stock_qty")
        .eq("id", id)
        .single();

    if (error) {
        console.error("could not retrieve product", error);
        return null;
    }

    return data;
}
