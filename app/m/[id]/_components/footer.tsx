import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-4xl space-y-20 p-4 text-muted-foreground print:hidden">
      <section className="flex items-center justify-center gap-2">
        <p className="text-sm">Powered by</p>{" "}
        <Link
          href={
            "https://www.xero.com/try-now/manage-invoices/?utm_source=xero-invoice&utm_medium=referral&utm_campaign=global-d-lf-xeroinvoicereferrals"
          }
        >
          <Image
            src={"/logos/xero.png"}
            alt="xero-logo"
            width={50}
            height={50}
          />
        </Link>
      </section>
      <section className="space-y-2 text-[10px] font-light">
        <p>Disclaimer</p>
        <p>
          This open-source project is a clone of the Xero invoice system,
          created purely for{" "}
          <span className="font-medium">educational purposes</span> and as a fun
          project to explore website cloning techniques. It is not intended for
          use in any commercial, financial, or professional context.
        </p>
        <p>Important Notice:</p>
        <ul className="list-inside list-decimal">
          <li>
            Unauthorized Use: This software is not affiliated with, endorsed by,
            or in any way connected to Xero Limited. Users are strictly
            prohibited from using this software for any illegal, fraudulent, or
            unethical activities.
          </li>
          <li>
            Legal Compliance: Users must comply with all applicable laws and
            regulations when using this software. Any use of this software that
            violates any law or regulation is strictly forbidden.
          </li>
          <li>
            No Warranty: This software is provided &apos;as is,&apos; without
            warranty of any kind, express or implied. The developers assume no
            responsibility for any damages or losses resulting from the use or
            misuse of this software.
          </li>
        </ul>
        <p>
          By downloading, installing, or using this software, you acknowledge
          and agree to this disclaimer and agree to use this software solely at
          your own risk. The developers are not liable for any misuse of this
          software.
        </p>
      </section>
    </footer>
  );
}
