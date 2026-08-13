export type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
    description?: string;
};

type Partner = {
    id: string;
    name: string;
    description?: string;
};

type OrderLine = {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
};

type SalesOrder = {
    salesId: string;
    customer: Partner;
    status: OrderStatus;
    lines: OrderLine[];
};

type OrderStatus = "draft" | "confirmed" | "delivered" | "cancelled";


function orderTotal(order: SalesOrder): number {
    let total: number = 0
    for (const line of order.lines) {
        total += (line.quantity * line.unitPrice)
    }
    return total
}

function tax(order: SalesOrder): number {
    const total: number = orderTotal(order)
    return total * 0.16
}

function lowStock(products: Product[]): Product[] {
    const lowStockProducts: Product[] = products.filter((product) => product.stock <= 5)
    return lowStockProducts
}

export function stockStatus(product: Product): "out" | "low" | "in" {
    if (product.stock === 0) return "out"
    if (product.stock <= 5) return "low"
    return "in"
}
