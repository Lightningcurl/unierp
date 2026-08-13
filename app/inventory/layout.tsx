import Link from "next/link";

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav style={{ display: "flex", gap: "16px", padding: "12px", backgroundColor: "lightblue"}}>
        <Link href="/">Home</Link>
        <Link href="/productList">Products</Link>
        <Link href="/inventory">Inventory</Link>
      </nav>
      {children}
    </>
  );
}
