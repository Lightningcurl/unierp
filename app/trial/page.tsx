"use client";
import { useState } from "react";

// Props: the data this component receives from its parent. Always typed.
type Props = {
    product: { id: string; name: string; price: number; stock: number };
    onAdd: (id: string, qty: number) => void;
};

export function ProductRow({ product, onAdd }: Props) {
// State: data that changes over time and re-renders the UI when it does.
    const [qty, setQty] = useState(1);
    const outOfStock = product.stock === 0;
    return (
        <tr className="border-b border-white/10">
            <td className="py-3 font-medium">{product.name}</td>
            <td>{product.price.toFixed(2)} JOD</td>
            <td>
                <input
                    type="number" min={1} max={product.stock} value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-20 rounded-lg bg-white/5 px-3 py-1"
                />
            </td>
            <td>
                /* Disabled is a courtesy to the user — the server must check stock too. */
                <button disabled={outOfStock} onClick={() => onAdd(product.id, qty)}>
                    {outOfStock ? "Out of stock" : "Add to order"}
                </button>
            </td>
        </tr>
    );
}
