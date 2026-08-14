import { products } from "@/lib/products";
import { stockStatus } from "@/tsdrills/erp_domain";
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
    <div>
      <h1>Inventory</h1>

      {products.length === 0 ? (
        <EmptyState message="No products in inventory" />
      ) : (
        <>
          <div style={{ display: "flex", gap: "16px" }}>
            <Card metric={lowStockMetric} />
            <Card metric={outOfStockMetric} />
          </div>

          <Table
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
        </>
      )}
    </div>
  );
}
