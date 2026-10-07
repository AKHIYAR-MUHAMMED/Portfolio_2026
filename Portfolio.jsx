import React, { useState, useEffect } from "react";
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
import Background3D from "./Background3D.jsx";
import Cursor3D from "./Cursor3D.jsx";
import ControlPanel3D from "./ControlPanel3D.jsx";
import { sound } from "./audio.js";

const THEME_ACCENTS = {
    orange: "#FF6B00",
    cyan: "#00E5FF",
    emerald: "#10B981",
    violet: "#A855F7",
};

export default function Portfolio() {
    const [theme, setTheme] = useState("orange"); // "orange" | "cyan" | "emerald" | "violet"
    const [bgActive, setBgActive] = useState(true);
    const [soundActive, setSoundActive] = useState(false);

    // Apply dynamic 3D theme accent color to root CSS variable
    useEffect(() => {
        const hex = THEME_ACCENTS[theme] || THEME_ACCENTS.orange;
        document.documentElement.style.setProperty("--color-accent", hex);
    }, [theme]);

    const handleToggleSound = () => {
        const newState = sound.toggleMute();
        setSoundActive(newState);
        return newState;
    };

    return (
        <div data-testid="portfolio-root" className="min-h-screen bg-[#0A0A0A] text-white relative selection:bg-accent selection:text-white transition-colors duration-500 overflow-x-hidden">
            {/* 3D WebGL Background Canvas */}
            <Background3D theme={theme} active={bgActive} />

            {/* Custom 3D Smooth Cursor */}
            <Cursor3D theme={theme} />

            {/* 3D Engine Control Panel Widget */}
            <ControlPanel3D
                activeTheme={theme}
                onThemeChange={setTheme}
                bgActive={bgActive}
                onToggleBg={() => setBgActive(!bgActive)}
                soundActive={soundActive}
                onToggleSound={handleToggleSound}
            />

            <Nav />
            <main className="relative z-10">
                <Hero theme={theme} />
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
