"use client"
import { Product } from "@/tsdrills/erp_domain";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { Table } from "@/components/Table";
import { products } from "@/lib/products";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock">("name")
  const [quantities, setQuantity] = useState<{ [productId: string]: number }>({})

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
    <div>
        <div>
            <h1>Products</h1>

            <Table labels={["ID", "Name", "Price", "Stock", "Quantity"]} lines={sortedProd}
                renderRow={(product) => [product.id,<Link href={"/productList/"+ product.id}>{product.name}</Link>,product.price,product.stock,
                    <input
                    type="number"
                    min={0}
                    max={product.stock}
                    value={quantities[product.id] ?? 0}
                    onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                    />
                ]}
            />
        </div>
        <div>
            <Input label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder=" ex: product A"/>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "price" | "stock")}>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
            </select>
        </div>
    </div>
  );
}
