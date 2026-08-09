import Nav from "./Nav.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Skills from "./Skills.jsx";
import Experience from "./Experience.jsx";
import Projects from "./Projects.jsx";
import Community from "./Community.jsx";
import Writing from "./Writing.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

export default function Portfolio() {
    return (
        <div data-testid="portfolio-root" className="min-h-screen bg-[#0A0A0A] text-white relative selection:bg-accent selection:text-white transition-colors duration-300">
            <Nav />
            <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Community />
                <Writing />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
