import Hero from "../sections/Hero";
import About from "../sections/About";
import FeaturedServices from "../sections/FeaturedServices";
import FeaturedProjects from "../sections/FeaturedProjects";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedServices />
      <FeaturedProjects />
      <Contact />
    </>
  );
}