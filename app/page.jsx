import Hero from "./components/Hero";
import Programs from "./components/Programs";
import Training from "./components/Training";
import HomeAnimations from "./components/HomeAnimations";
import TextureBackground from "./components/TextureBackground";
import AboutMaster from "./components/AboutMaster";
import Testimonials from "./components/Testimonials";

export const metadata = {
  title: "LHBS - Live Healthy Be Safe",
  description: "Learn Martial Arts from the best. Expert training in Muay Thai, Kung-fu, Krav Maga, and more.",
};

export default function Home() {
  return (
    <>
      <TextureBackground />
      <HomeAnimations />
      <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden w-full max-w-[100vw]">
        <Hero />
        <Programs />
        <AboutMaster />
        <Testimonials />
        <Training />
      </main>
    </>
  );
}
