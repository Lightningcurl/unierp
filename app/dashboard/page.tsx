import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { metrics } from '@/tsdrills/erp_data'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-start gap-6 bg-zinc-50 p-6 font-sans dark:bg-black">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <div className="mx-auto grid grid-cols-1 place-items-center gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <Card key={metric.id} metric={metric} />
            ))}
          </div>
        <Badge value="Confirmed" color="[#1AF7B6]"></Badge>
    </div>
  );
}
