import DashboardNav from "@/app/dashboard/_components/dashboard-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardNav />
      <main className="mx-auto max-w-4xl p-4">{children}</main>
    </div>
  );
}
