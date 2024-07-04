import Invoice from "@/app/m/[id]/_components/invoice";
import { InvoiceId } from "@/lib/db/schema";

interface PageProps {
  params: {
    id: InvoiceId;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      <Invoice invoiceId={params.id} />
    </div>
  );
}
