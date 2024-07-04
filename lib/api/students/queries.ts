import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type StudentId, studentIdSchema, students } from "@/lib/db/schema/students";

export const getStudents = async () => {
  const s = await db.select().from(students);
  return { students: s };
};

export const getStudentById = async (id: StudentId) => {
  const { id: studentId } = studentIdSchema.parse({ id });
  const [s] = await db.select().from(students).where(eq(students.id, studentId));
  return { student: s };
};

