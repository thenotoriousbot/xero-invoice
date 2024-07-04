import { type getCompanies } from "@/lib/api/companies/queries";
import { invoices } from "@/lib/db/schema";
import { nanoid } from "@/lib/utils";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const companies = pgTable("companies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").unique().notNull(),
  logo: text("logo"),
  uaeVat: text("uae_vat").unique().notNull(),
  registrationNumber: text("registration_number").unique().notNull(),
  registeredOffice: text("registered_office").notNull(),
  contactEmail: text("contact_email"),
  website: text("website"),
});

export const companyRelations = relations(companies, ({ many }) => ({
  invoices: many(invoices),
}));

// Schema for companies - used to validate API requests
export const insertCompanieschema = createInsertSchema(companies);

export const insertCompanyParams = createSelectSchema(companies, {
  name: (schema) => schema.name.min(1),
  registrationNumber: (schema) => schema.registrationNumber.min(1),
  uaeVat: (schema) => schema.uaeVat.min(1),
  registeredOffice: (schema) => schema.registeredOffice.min(1),
}).omit({
  id: true,
});

export const updateCompanieschema = createSelectSchema(companies);

export const updateCompanyParams = createSelectSchema(companies, {});

export const companyIdSchema = updateCompanieschema.pick({ id: true });

// Types for companies - used to type API request params and within Components
export type Company = z.infer<typeof updateCompanieschema>;
export type NewCompany = z.infer<typeof insertCompanieschema>;
export type NewCompanyParams = z.infer<typeof insertCompanyParams>;
export type UpdateCompanyParams = z.infer<typeof updateCompanyParams>;
export type CompanyId = z.infer<typeof companyIdSchema>["id"];

// this type infers the return from getCompanies() - meaning it will include any joins
export type CompleteCompany = Awaited<
  ReturnType<typeof getCompanies>
>["companies"][number];
