import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-10 items-center bg-xero-blue print:hidden">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-end">
        <Link
          href={"https://login.xero.com/identity/user/login"}
          className="px-4 text-sm font-medium text-white"
        >
          Log in to save invoice as a bill
        </Link>
      </div>
    </header>
  );
}
