import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import FeaturedServices from "../sections/FeaturedServices";
import FeaturedProjects from "../sections/FeaturedProjects";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedServices />
      <FeaturedProjects />
      <Contact />
    </>
  );
}