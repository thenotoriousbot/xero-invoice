import CreateStudent from "@/app/dashboard/students/_components/create-student";
import ShowStudents from "@/app/dashboard/students/_components/show-students";
export default function Page() {
  return (
    <div>
      <section className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Students</h1>
        <CreateStudent />
      </section>
      <ShowStudents />
    </div>
  );
}
