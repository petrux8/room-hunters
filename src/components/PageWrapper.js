import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PageWrapper({ children, minimalHeader = false }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header minimal={minimalHeader} />
      <div className="grow">
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div>{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
