import { insertStudentParams, students } from "@/lib/db/schema";
import { publicProcedure, router } from "@/lib/server/trpc";
export const studentsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.students.findMany();
  }),
  create: publicProcedure
    .input(insertStudentParams)
    .mutation(({ input, ctx }) => {
      return ctx.db.insert(students).values(input);
    }),
});
