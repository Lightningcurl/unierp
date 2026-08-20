"use client"
import { Product } from "@/tsdrills/erp_domain";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { Table } from "@/components/Table";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock">("name")
  const [quantities, setQuantity] = useState<{ [productId: string]: number }>({})

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .finally(() => setLoading(false));
  }, []);

  function updateQuantity(productId: string, quant: number) {
    setQuantity((prev) => ({ ...prev, [productId]:quant}))
  }

  const filteredProd: Product[] = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const sortedProd: Product[] = [...filteredProd].sort((a,b) => {if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
    return a[sortBy] - b[sortBy];
    }
    return String(a[sortBy]).localeCompare(String(b[sortBy]));}
)

  return (
    <div className="flex flex-col flex-1 items-start gap-10 bg-zinc-50 p-6 font-sans dark:bg-black">
        <h1 className="text-stat font-semibold tracking-tight text-foreground">Products</h1>

        <div className="flex w-full flex-col gap-6">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table labels={["ID", "Name", "Price", "Stock", "Quantity"]} lines={sortedProd}
                    renderRow={(product) => [product.id,<Link href={"/products/"+ product.id}>{product.name}</Link>,product.price,product.stock,
                        <input
                        type="number"
                        min={0}
                        max={product.stock}
                        value={quantities[product.id] ?? 0}
                        onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                        />
                    ]}
                />
            )}
            <div>
                <Input label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder=" ex: product A"/>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "price" | "stock")}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="stock">Stock</option>
                </select>
            </div>
        </div>
    </div>
  );
}
