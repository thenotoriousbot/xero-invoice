import { type getStudents } from "@/lib/api/students/queries";
import { invoices } from "@/lib/db/schema";
import { nanoid } from "@/lib/utils";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name").notNull(),
  lastName: text("last_name").notNull(),
});

export const studentRelations = relations(students, ({ many }) => ({
  invoices: many(invoices),
}));

// Schema for students - used to validate API requests
export const insertStudentSchema = createInsertSchema(students);

export const insertStudentParams = createSelectSchema(students, {
  firstName: (schema) => schema.firstName.min(1),
  middleName: (schema) => schema.middleName.min(1),
  lastName: (schema) => schema.lastName.min(1),
}).omit({
  id: true,
});

export const updateStudentSchema = createSelectSchema(students);

export const updateStudentParams = createSelectSchema(students, {});

export const studentIdSchema = updateStudentSchema.pick({ id: true });

// Types for students - used to type API request params and within Components
export type Student = z.infer<typeof updateStudentSchema>;
export type NewStudent = z.infer<typeof insertStudentSchema>;
export type NewStudentParams = z.infer<typeof insertStudentParams>;
export type UpdateStudentParams = z.infer<typeof updateStudentParams>;
export type StudentId = z.infer<typeof studentIdSchema>["id"];

// this type infers the return from getStudents() - meaning it will include any joins
export type CompleteStudent = Awaited<
  ReturnType<typeof getStudents>
>["students"][number];
