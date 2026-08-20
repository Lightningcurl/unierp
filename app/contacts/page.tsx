import { getPartners } from "@/lib/data/partners";
import { Table } from "@/components/Table";
import { EmptyState } from "@/components/EmptyState";

export default async function ContactsPage() {
    const partners = await getPartners();

    return (
        <div className="flex flex-col flex-1 items-start gap-10 bg-zinc-50 p-6 font-sans dark:bg-black">
            <h1 className="text-stat font-semibold tracking-tight text-foreground">Contacts</h1>

            {!partners || partners.length === 0 ? (
                <EmptyState message="No contacts yet" />
            ) : (
                <div className="mt-6 w-full">
                    <Table
                        labels={["ID", "Name", "Type", "Email", "Phone"]}
                        lines={partners}
                        renderRow={(partner) => [partner.id, partner.name, partner.type, partner.email, partner.phone]}
                    />
                </div>
            )}
        </div>
    );
}