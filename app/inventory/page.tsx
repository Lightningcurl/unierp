"use client"
import { useEffect, useState } from "react";
import { Product, stockStatus } from "@/tsdrills/erp_domain";
import { Table } from "@/components/Table";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import type { Metric } from "@/tsdrills/erp_data";

const statusLabel = {
  out: "Out of stock",
  low: "Low stock",
  in: "In stock",
};

const statusColor = {
  out: "red-500",
  low: "yellow-500",
  in: "[#1AF7B6]",
};

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .finally(() => setLoading(false));
  }, []);

  const lowStockProducts = products.filter((product) => stockStatus(product) === "low");
  const outOfStock = products.filter((product) => stockStatus(product) === "out");

  const lowStockMetric: Metric = {
    id: "low-stock",
    label: "Low stock",
    value: String(lowStockProducts.length),
    helper: "Below safety threshold",
    change: "",
    tone: "warning",
  };

  const outOfStockMetric: Metric = {
    id: "out-of-stock",
    label: "Out of stock",
    value: String(outOfStock.length),
    helper: "Needs reorder",
    change: "",
    tone: "destructive",
  };

  return (
    <div className="flex h-dvh flex-col items-start gap-10 overflow-hidden bg-zinc-50 p-6 font-sans dark:bg-black">
      <h1 className="text-stat font-semibold tracking-tight text-foreground">Inventory</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <EmptyState message="No products in inventory" />
      ) : (
        <div className="flex w-full min-h-0 flex-1 flex-col gap-6">
          <div style={{ display: "flex", gap: "16px" }}>
            <Card metric={lowStockMetric} />
            <Card metric={outOfStockMetric} />
          </div>

          <div className="min-h-0 flex-1">
            <Table
              className="h-full"
              labels={["ID", "Name", "Price", "Stock", "Status"]}
              lines={products}
              renderRow={(product) => {
                const status = stockStatus(product);
                return [
                  product.id,
                  product.name,
                  product.price,
                  product.stock,
                  <Badge key={product.id} value={statusLabel[status]} color={statusColor[status]} />,
                ];
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
