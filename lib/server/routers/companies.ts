import { companies, insertCompanyParams } from "@/lib/db/schema";
import { publicProcedure, router } from "@/lib/server/trpc";
export const companiesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.companies.findMany();
  }),
  create: publicProcedure
    .input(insertCompanyParams)
    .mutation(({ input, ctx }) => {
      return ctx.db.insert(companies).values(input);
    }),
});
