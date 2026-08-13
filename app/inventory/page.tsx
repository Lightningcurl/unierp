import { products } from "@/lib/products";
import { stockStatus } from "@/tsdrills/erp_domain";
import { Table } from "@/components/Table";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";

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

  return (
    <div>
      <h1>Inventory</h1>

      {products.length === 0 ? (
        <EmptyState message="No products in inventory" />
      ) : (
        <>
          <div style={{ display: "flex", gap: "16px" }}>
            <Card category="Low stock">{lowStockProducts.length}</Card>
            <Card category="Out of stock">{outOfStock.length}</Card>
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
