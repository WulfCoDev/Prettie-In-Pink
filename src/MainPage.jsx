import waspLogo from "./waspLogo.png";
import "./Main.css";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import AboutUs from "./components/AboutUs";
import ServicesOverview from "./components/ServicesOverview";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

export const MainPage = () => {
  return (
    <div className="bg-brick bg-no-repeat bg-cover min-h-[100vh]">
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col items-center bg-pink-300/50 space-y-6 py-4">
        <HeroCarousel />

        <AboutUs />
        <ServicesOverview />
        <Testimonials />

        <Contact />
      </main>
    </div>
  );
};
