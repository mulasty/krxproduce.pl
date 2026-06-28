import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import MoodBoard from "@/components/mood-board";
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
        <Services />
        <MoodBoard />
        <About />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
