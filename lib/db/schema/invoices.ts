import { type getInvoices } from "@/lib/api/invoices/queries";
import { companies, students } from "@/lib/db/schema";
import { nanoid } from "@/lib/utils";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const invoices = pgTable("invoices", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  invoiceNumber: text("invoice_number").unique().notNull(),
  IssueDate: timestamp("Issue_date").defaultNow().notNull(),
  paid: boolean("paid").default(false).notNull(),
  companyId: text("company_id")
    .references(() => companies.id)
    .notNull(),
  studentId: text("student_id")
    .references(() => students.id)
    .notNull(),
});

export const invoiceRelations = relations(invoices, ({ one }) => ({
  company: one(companies, {
    fields: [invoices.companyId],
    references: [companies.id],
  }),
  student: one(students, {
    fields: [invoices.studentId],
    references: [students.id],
  }),
}));

// Schema for invoices - used to validate API requests
export const insertInvoiceschema = createInsertSchema(invoices);

export const insertInvoiceParams = createSelectSchema(invoices, {
  companyId: (schema) => schema.companyId.min(1),
  studentId: (schema) => schema.studentId.min(1),
}).omit({
  id: true,
});

export const updateInvoiceschema = createSelectSchema(invoices);

export const updateInvoiceParams = createSelectSchema(invoices, {});

export const invoiceIdSchema = updateInvoiceschema.pick({ id: true });

// Types for invoices - used to type API request params and within Components
export type Invoice = z.infer<typeof updateInvoiceschema>;
export type NewInvoice = z.infer<typeof insertInvoiceschema>;
export type NewInvoiceParams = z.infer<typeof insertInvoiceParams>;
export type UpdateInvoiceParams = z.infer<typeof updateInvoiceParams>;
export type InvoiceId = z.infer<typeof invoiceIdSchema>["id"];

// this type infers the return from getInvoices() - meaning it will include any joins
export type CompleteInvoice = Awaited<
  ReturnType<typeof getInvoices>
>["invoices"][number];
