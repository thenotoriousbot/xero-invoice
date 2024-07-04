"use client";

import { trpc } from "@/lib/trpc/client";

export default function ShowCompanies() {
  const { data: companies, isLoading } = trpc.companies.getAll.useQuery();

  if (isLoading) return "Loading...";

  if (!companies || companies.length <= 0) return "No companies found.";

  return (
    <ul className="list-inside list-decimal">
      {companies.map((company) => (
        <li key={company.id}>{company.name}</li>
      ))}
    </ul>
  );
}
