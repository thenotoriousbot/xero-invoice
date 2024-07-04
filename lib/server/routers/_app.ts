import { companiesRouter } from "@/lib/server/routers/companies";
import { invoicesRouter } from "@/lib/server/routers/invoices";
import { studentsRouter } from "@/lib/server/routers/students";
import { router } from "@/lib/server/trpc";

export const appRouter = router({
  students: studentsRouter,
  invoices: invoicesRouter,
  companies: companiesRouter,
});

export type AppRouter = typeof appRouter;
