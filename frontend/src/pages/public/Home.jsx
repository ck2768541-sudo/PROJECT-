import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import Pricing from "../../components/home/Pricing";
import Footer from "../../components/home/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}

export default Home;