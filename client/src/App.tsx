import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider, useData } from "./context/DataContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Services from "./pages/Services";

const MIN_LOADING_MS = 1800;

function AppContent() {
  const { loading } = useData();
  const hasPlayedIntro = sessionStorage.getItem("intro-played") === "true";

  const [minTimePassed, setMinTimePassed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showApp, setShowApp] = useState(hasPlayedIntro);
  const [removeLoader, setRemoveLoader] = useState(hasPlayedIntro);

  useEffect(() => {
    if (hasPlayedIntro) return;
    const timer = setTimeout(() => setMinTimePassed(true), MIN_LOADING_MS);
    return () => clearTimeout(timer);
  }, [hasPlayedIntro]);

  useEffect(() => {
    if (hasPlayedIntro) return;
    if (!loading && minTimePassed && !exiting) {
      setExiting(true);
      setTimeout(() => {
        setShowApp(true);
        sessionStorage.setItem("intro-played", "true");
      }, 400);
      setTimeout(() => setRemoveLoader(true), 1200);
    }
  }, [loading, minTimePassed, exiting, hasPlayedIntro]);

  return (
    <>
      <ScrollToTop />
      {!removeLoader && <LoadingScreen exiting={exiting} />}

      <div
        className={`min-h-screen bg-background text-text transition-all duration-1000 ease-out ${
          showApp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;