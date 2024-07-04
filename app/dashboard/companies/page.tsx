import CreateCompany from "@/app/dashboard/companies/_components/create-company";
import ShowCompanies from "@/app/dashboard/companies/_components/show-companies";
export default function Page() {
  return (
    <div>
      <section className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Companies</h1>
        <CreateCompany />
      </section>
      <ShowCompanies />
    </div>
  );
}
