"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceId } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { CheckCircle, DownloadSimple, XCircle } from "@phosphor-icons/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import AskQuestion from "./ask-question";

interface InvoiceProps {
  invoiceId: InvoiceId;
}

export default function Invoice({ invoiceId }: InvoiceProps) {
  const { data: invoice, isLoading } = trpc.invoices.getById.useQuery({
    id: invoiceId,
  });
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Invoice INV-21029",
    removeAfterPrint: true,
  });

  if (isLoading) return "Loading...";

  if (!invoice) return null;

  return (
    <div>
      <header className="sticky top-10 z-40 bg-white shadow-md shadow-black/25 print:hidden">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-1 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              1,200.00{" "}
              <span className="text-base font-normal text-neutral-600">
                USD
              </span>
            </h1>
            <div
              className={cn(
                "flex items-center gap-1",
                invoice.paid ? "text-xero-green" : "text-xero-red",
              )}
            >
              {invoice.paid ? (
                <CheckCircle weight="fill" />
              ) : (
                <XCircle weight="fill" />
              )}
              <p className="text-xs font-medium uppercase">
                {invoice.paid ? "Piad" : "Not Paid"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <AskQuestion />
            {invoice.paid && (
              <Button
                variant={"outline"}
                className="h-10 w-full border-xero-border font-semibold !text-xero-blue"
                onClick={() => {
                  handlePrint(null, () => contentToPrint.current);
                }}
              >
                Download <DownloadSimple className="ml-2 size-5" />
              </Button>
            )}
          </div>
        </div>
      </header>
      <main
        ref={contentToPrint}
        className="mx-auto max-w-5xl py-4 sm:px-4 print:p-0"
      >
        <div className="border border-xero-border bg-white">
          <header>
            <section
              className={cn(
                "flex h-10 items-center justify-center gap-2 text-white",
                invoice.paid ? "bg-xero-green print:hidden" : "bg-xero-red",
              )}
            >
              {invoice.paid ? (
                <CheckCircle weight="fill" className="size-6" />
              ) : (
                <XCircle weight="fill" className="size-6" />
              )}
              <h1 className="text-lg font-medium uppercase">
                {invoice.paid ? "Paid" : "Not Paid"}
              </h1>
            </section>
            <section className="flex items-center justify-between border-b border-xero-border px-8 py-4 print:py-0">
              <h1 className="text-lg font-medium uppercase">Invoice</h1>
              <div className="relative size-32 border">
                {invoice.company.logo && (
                  <Image
                    src={invoice.company.logo}
                    alt={`${invoice.company.name} logo`}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            </section>
          </header>
          <main className="divide-y divide-xero-border">
            <section className="grid gap-12 px-8 py-4 md:grid-cols-2 print:gap-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-40 font-medium">To</TableCell>
                    <TableCell>
                      {invoice.student.firstName} {invoice.student.lastName}{" "}
                      {invoice.student.middleName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-40 font-medium">
                      Invoice number
                    </TableCell>
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-40 font-medium">
                      Issue date
                    </TableCell>
                    <TableCell>{format(invoice.IssueDate, "PP")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-40 font-medium">From</TableCell>
                    <TableCell>
                      <p>{invoice.company.name}</p>
                      {invoice.company.registeredOffice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-40 font-medium">UAE VAT</TableCell>
                    <TableCell>{invoice.company.uaeVat}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
            <section className="divide-y px-8 py-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-40">Quantity</TableHead>
                    <TableHead className="w-40">Unit Price</TableHead>
                    <TableHead className="w-40">Tax</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Visa Fee</TableCell>
                    <TableCell>1.00</TableCell>
                    <TableCell>43.60</TableCell>
                    <TableCell>Tax Exempt</TableCell>
                    <TableCell className="text-right font-medium">
                      43.60
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Visa Fee</TableCell>
                    <TableCell>1.00</TableCell>
                    <TableCell>1,056.40</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell className="text-right font-medium">
                      1,056.40
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Application Fee</TableCell>
                    <TableCell>1.00</TableCell>
                    <TableCell>100.00</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell className="text-right font-medium">
                      100.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="ml-auto md:w-1/2">
                <Table className="w-full">
                  <TableBody>
                    <TableRow>
                      <TableCell>Subtotal</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Includes Tax 5% *</TableCell>
                      <TableCell className="text-right">55.06</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">USD 1,200.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Less amount not paid</TableCell>
                      <TableCell className="text-right">1,200.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-base font-normal">
                        Amount due
                      </TableCell>
                      <TableCell className="text-right text-lg font-normal">
                        USD <span className="font-medium">0.00</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>
            <section className="px-8 py-4">
              <div className="mr-auto text-[10px] md:w-1/3">
                <div className="px-2">
                  <p>*AED Equivalent Conversion Rate</p>
                  <p>1 AED = 0.272479 USD</p>
                </div>
                <Table className="text-[10px]">
                  <TableHeader>
                    <TableRow className="uppercase">
                      <TableHead>Tax rate</TableHead>
                      <TableHead className="text-right">Net goods</TableHead>
                      <TableHead className="text-right">Tax</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Tax Exempt</TableCell>
                      <TableCell className="text-right">160.02</TableCell>
                      <TableCell className="text-right">0.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5%</TableCell>
                      <TableCell className="text-right">4041.92</TableCell>
                      <TableCell className="text-right">202.07</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>
          </main>
        </div>
        <div className="divide-y border border-xero-border px-8 py-4">
          <section className="space-y-4 py-4">
            <h1 className="text-xl font-medium">{invoice.company.name}</h1>
            <div className="text-muted-foregrou text-xs font-light">
              <p>
                Company Registration No: {invoice.company.registrationNumber}
              </p>
              <p>Registered Office: {invoice.company.registeredOffice}</p>
            </div>
          </section>
          <section className="space-y-4 py-4 print:hidden">
            <ul className="flex flex-wrap items-center gap-2">
              {invoice.company.contactEmail && (
                <li>
                  <Link
                    href={`mailto:${invoice.company.contactEmail}`}
                    className="text-sm font-light text-xero-blue underline"
                  >
                    {invoice.company.contactEmail}
                  </Link>
                </li>
              )}
              {invoice.company.website && (
                <li>
                  <Link
                    href={invoice.company.website}
                    target="_blank"
                    className="text-sm font-light text-xero-blue underline"
                  >
                    {invoice.company.website}
                  </Link>
                </li>
              )}
            </ul>
            {/* <ul>
              <li>
                <Link href={""}>
                  <Image
                    src={"/logos/linkedin.png"}
                    alt="linkedin-logo"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </Link>
              </li>
            </ul> */}
          </section>
        </div>
      </main>
    </div>
  );
}
