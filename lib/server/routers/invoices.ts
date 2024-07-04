import {
  insertInvoiceParams,
  invoiceIdSchema,
  invoices,
} from "@/lib/db/schema";
import { publicProcedure, router } from "@/lib/server/trpc";
import { eq } from "drizzle-orm";
export const invoicesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.invoices.findMany({
      with: {
        student: true,
      },
    });
  }),
  getById: publicProcedure.input(invoiceIdSchema).query(({ input, ctx }) => {
    return ctx.db.query.invoices.findFirst({
      where: eq(invoices.id, input.id),
      with: {
        company: true,
        student: true,
      },
    });
  }),
  create: publicProcedure
    .input(insertInvoiceParams)
    .mutation(({ input, ctx }) => {
      return ctx.db.insert(invoices).values(input);
    }),
});
