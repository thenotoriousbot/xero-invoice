"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const dashboardLinks = [
  {
    name: "Students",
    path: "/dashboard/students",
  },
  {
    name: "Companies",
    path: "/dashboard/companies",
  },
  {
    name: "Invoices",
    path: "/dashboard/invoices",
  },
];
export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <ul className="list-inside list-disc px-4">
      {dashboardLinks.map((dashboardLink, i) => (
        <li key={i}>
          <Link
            href={dashboardLink.path}
            className={cn(
              "hover:underline",
              pathname === dashboardLink.path && "underline",
            )}
          >
            {dashboardLink.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
