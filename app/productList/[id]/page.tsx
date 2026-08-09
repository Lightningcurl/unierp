"use client"
import { Product } from "@/tsdrills/erp_domain";
import { useState } from "react";
import Link from "next/link";

import {products} from "@/app/productList/page"
import { use } from "react";


export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const {id : productId} = use(params)
    const product: Product | undefined = products.find((prod) => prod.id === productId)

    console.log("productId:", productId, typeof productId);
    console.log("products:", products);

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
            <Link href={"/productList"}>Terug</Link>

        </div>
    );
}
