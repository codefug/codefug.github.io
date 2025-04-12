import Header from "@/components/ui/header";
import About from "@/public/mdx/about.mdx";

export default function Page() {
  return (
    <>
      <Header />
      <div className="prose">
        <About />
      </div>
    </>
  );
}
