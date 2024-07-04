import { db } from "@/lib/db/index";
import {
  InvoiceId,
  NewInvoiceParams,
  UpdateInvoiceParams,
  insertInvoiceschema,
  invoiceIdSchema,
  invoices,
  updateInvoiceschema,
} from "@/lib/db/schema/invoices";
import { eq } from "drizzle-orm";

export const createInvoice = async (invoice: NewInvoiceParams) => {
  const newInvoice = insertInvoiceschema.parse(invoice);
  try {
    const [s] = await db.insert(invoices).values(newInvoice).returning();
    return { invoice: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateInvoice = async (
  id: InvoiceId,
  invoice: UpdateInvoiceParams,
) => {
  const { id: invoiceId } = invoiceIdSchema.parse({ id });
  const newInvoice = updateInvoiceschema.parse(invoice);
  try {
    const [s] = await db
      .update(invoices)
      .set(newInvoice)
      .where(eq(invoices.id, invoiceId!))
      .returning();
    return { invoice: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteInvoice = async (id: InvoiceId) => {
  const { id: invoiceId } = invoiceIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(invoices)
      .where(eq(invoices.id, invoiceId!))
      .returning();
    return { invoice: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
