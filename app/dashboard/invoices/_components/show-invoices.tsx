"use client";

import { trpc } from "@/lib/trpc/client";
import Link from "next/link";

export default function ShowInvoices() {
  const { data: invoices, isLoading } = trpc.invoices.getAll.useQuery();

  if (isLoading) return "Loading...";

  if (!invoices || invoices.length <= 0) return "No invoices found.";

  return (
    <ul className="list-inside list-decimal">
      {invoices.map((invoice) => (
        <li key={invoice.id}>
          <Link href={`/m/${invoice.id}`} className="hover:underline">
            {invoice.invoiceNumber} ({invoice.student.firstName}{" "}
            {invoice.student.lastName})
          </Link>
        </li>
      ))}
    </ul>
  );
}
