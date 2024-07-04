import { db } from "@/lib/db/index";
import {
  invoiceIdSchema,
  invoices,
  type InvoiceId,
} from "@/lib/db/schema/invoices";
import { eq } from "drizzle-orm";

export const getInvoices = async () => {
  const s = await db.select().from(invoices);
  return { invoices: s };
};

export const getInvoiceById = async (id: InvoiceId) => {
  const { id: invoiceId } = invoiceIdSchema.parse({ id });
  const [s] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId));
  return { invoice: s };
};
