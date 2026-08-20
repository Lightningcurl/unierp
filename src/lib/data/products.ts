import { Product } from "@/tsdrills/erp_domain";
import { createClient } from "@/lib/supabase/server";

export const products: Product[] = [
  { id: "1", name: "product A", price: 10, stock: 5 },
  { id: "2", name: "product B", price: 25, stock: 0 },
  { id: "3", name: "product C", price: 7.5, stock: 20 },
];

// export async function getProducts() {
//     const supabase = await createClient();

//     const { data, error } = await supabase.from("products").select("*");

//     if (error) {
//         console.error("could not retrieve name", error);
//         return null;
//     }

//      return data;
//   }
