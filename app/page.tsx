import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Hero3DSection from "@/components/hero-3d-section";
import Services from "@/components/services";
import About from "@/components/about";
import Portfolio from "@/components/portfolio";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Hero3DSection />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
