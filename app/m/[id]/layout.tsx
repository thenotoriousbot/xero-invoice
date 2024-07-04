import Footer from "@/app/m/[id]/_components/footer";
import Header from "@/app/m/[id]/_components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
