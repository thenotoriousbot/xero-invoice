import CreateInvoice from "@/app/dashboard/invoices/_components/create-invoice";
import ShowInvoices from "@/app/dashboard/invoices/_components/show-invoices";
export default function Page() {
  return (
    <div>
      <section className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Invoices</h1>
        <CreateInvoice />
      </section>
      <ShowInvoices />
    </div>
  );
}
