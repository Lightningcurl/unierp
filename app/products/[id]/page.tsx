"use client"
import { Product } from "@/tsdrills/erp_domain";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: productId } = use(params)
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => setProduct(data?.product ?? null))
            .finally(() => setLoading(false));
    }, [productId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div>
            <p>This page is for {product.name}</p>
            <table>
                <tbody>
                    <tr>
                        <td> Product Id: {product.id}</td>
                    </tr>
                    <tr>
                        <td> Product name: {product.name}</td>
                    </tr>
                    <tr>
                        <td> Price: {product.price}</td>
                    </tr>
                </tbody>
            </table>
            <Link href={"/products"}><Button variant="primary">Terug </Button></Link>

        </div>
    );
}
