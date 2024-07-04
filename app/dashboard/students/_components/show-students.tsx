"use client";

import { trpc } from "@/lib/trpc/client";

export default function ShowStudents() {
  const { data: students, isLoading } = trpc.students.getAll.useQuery();

  if (isLoading) return "Loading...";

  if (!students || students.length <= 0) return "No students found.";

  return (
    <ul className="list-inside list-decimal">
      {students.map((student) => (
        <li key={student.id}>
          {student.firstName} {student.lastName}
        </li>
      ))}
    </ul>
  );
}
