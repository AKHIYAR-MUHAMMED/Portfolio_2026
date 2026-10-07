import { useState } from "react";
import { ArrowUpRight, Download, MapPin, Eye, Sparkles } from "lucide-react";
import { PROFILE, getResumeUrl } from "./portfolio.js";
import ResumeModal from "./ResumeModal.jsx";
import Hero3D from "./Hero3D.jsx";
import TiltCard from "./TiltCard.jsx";
import { sound } from "./audio.js";
import { toast } from "sonner";

export default function Hero({ theme = "orange" }) {
    const [resumeModalOpen, setResumeModalOpen] = useState(false);

    const handleDownloadResume = (e) => {
        e.preventDefault();
        sound.playClick();
        const url = getResumeUrl();
        const link = document.createElement('a');
        link.href = url;
        link.download = 'AKHI_RESUME_18-05.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Downloading Akhiyar's Resume (AKHI_RESUME_18-05.pdf)");
    };

    return (
        <>
            <section id="hero" data-testid="hero-section" className="relative pt-32 md:pt-36 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
                <div className="relative max-w-7xl mx-auto">
                    {/* Overline with status pill */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 fade-up" style={{ animationDelay: "0.05s" }}>
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-px bg-accent" />
                            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-accent font-semibold">
                                Live 3D Portfolio / 2026
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full font-mono text-[10px] uppercase tracking-wider backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Available for Internships &amp; Projects</span>
                        </div>
                    </div>

                    {/* Main Hero Header & 3D Interactive Stage Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Column 1: Headline & CTAs */}
                        <div className="lg:col-span-7 space-y-6">
                            <h1
                                data-testid="hero-name"
                                className="font-display font-semibold text-[13vw] lg:text-[7.5vw] leading-[0.88] tracking-tighter text-white fade-up select-none"
                                style={{ animationDelay: "0.15s" }}
                            >
                                Akhiyar
                                <br />
                                <span className="text-accent">Muhammed</span>
                                <span className="text-accent cursor-blink">_</span>
                            </h1>

                            <p className="font-body text-lg md:text-xl text-[#E5E7EB] leading-relaxed max-w-2xl fade-up" style={{ animationDelay: "0.25s" }}>
                                Data Science engineer + full-stack builder. Specializing in Python, machine learning models, and modern React 3D architectures to transform data into human-centered software.
                            </p>

                            {/* CTA Action Bar */}
                            <div className="pt-2 flex flex-wrap items-center gap-4 fade-up" style={{ animationDelay: "0.35s" }}>
                                <a
                                    data-testid="hero-cta-work"
                                    href="#projects"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sound.playClick();
                                        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="group inline-flex items-center gap-2 bg-accent hover:bg-[#FF8B33] text-white px-6 py-3.5 rounded-sm font-mono text-xs uppercase tracking-[0.18em] transition-all shadow-lg cursor-pointer font-semibold"
                                >
                                    <span>Explore Work</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>

                                <button
                                    data-testid="hero-cta-resume"
                                    onClick={handleDownloadResume}
                                    onMouseEnter={() => sound.playHover()}
                                    className="inline-flex items-center gap-2 border border-[#333333] hover:border-accent bg-[#141414] hover:bg-[#1A1A1A] text-white px-5 py-3.5 rounded-sm font-mono text-xs uppercase tracking-[0.18em] transition-all cursor-pointer"
                                    title="Download AKHI_RESUME_18-05.pdf"
                                >
                                    <Download className="w-4 h-4 text-accent" />
                                    <span>Resume</span>
                                </button>

                                <button
                                    onClick={() => {
                                        sound.playClick();
                                        setResumeModalOpen(true);
                                    }}
                                    onMouseEnter={() => sound.playHover()}
                                    className="inline-flex items-center gap-2 border border-[#262626] hover:border-accent/60 text-[#9CA3AF] hover:text-white px-4 py-3.5 rounded-sm font-mono text-xs uppercase tracking-[0.18em] transition-all cursor-pointer"
                                    title="Quick Preview Resume"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Preview</span>
                                </button>
                            </div>

                            {/* Stat Grid inside 3D Tilt Cards */}
                            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 fade-up" style={{ animationDelay: "0.45s" }}>
                                <TiltCard maxTilt={8} scale={1.03}>
                                    <div className="p-4 bg-[#121218]/40 backdrop-blur-xl border border-white/15 rounded-lg shadow-xl hover:border-accent/60 transition-all">
                                        <div className="font-display text-2xl md:text-3xl text-white font-bold">4+</div>
                                        <div className="font-mono text-[9px] uppercase tracking-wider text-[#9CA3AF] mt-0.5">Years Coding</div>
                                    </div>
                                </TiltCard>

                                <TiltCard maxTilt={8} scale={1.03}>
                                    <div className="p-4 bg-[#121218]/40 backdrop-blur-xl border border-white/15 rounded-lg shadow-xl hover:border-accent/60 transition-all">
                                        <div className="font-display text-2xl md:text-3xl text-white font-bold">5</div>
                                        <div className="font-mono text-[9px] uppercase tracking-wider text-[#9CA3AF] mt-0.5">Communities</div>
                                    </div>
                                </TiltCard>

                                <TiltCard maxTilt={8} scale={1.03}>
                                    <div className="p-4 bg-[#121218]/40 backdrop-blur-xl border border-white/15 rounded-lg shadow-xl hover:border-accent/60 transition-all">
                                        <div className="font-display text-2xl md:text-3xl text-white font-bold">5</div>
                                        <div className="font-mono text-[9px] uppercase tracking-wider text-[#9CA3AF] mt-0.5">Languages</div>
                                    </div>
                                </TiltCard>
                            </div>
                        </div>

                        {/* Column 2: Interactive 3D Stage */}
                        <div className="lg:col-span-5 fade-up" style={{ animationDelay: "0.3s" }}>
                            <TiltCard maxTilt={6} scale={1.01} glare={false}>
                                <Hero3D theme={theme} />
                            </TiltCard>
                        </div>
                    </div>
                </div>

                {/* Marquee ticker */}
                <div className="relative mt-20 border-y border-white/10 overflow-hidden bg-[#0D0D12]/40 backdrop-blur-md">
                    <div className="marquee-track flex whitespace-nowrap py-5">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex shrink-0 items-center gap-12 pr-12">
                                {[
                                    "Live 3D WebGL",
                                    "•",
                                    "Data Science",
                                    "•",
                                    "Full Stack",
                                    "•",
                                    "Python & Pandas",
                                    "•",
                                    "React & Node.js",
                                    "•",
                                    "Machine Learning",
                                    "•",
                                    "Three.js & R3F",
                                    "•",
                                    "Hack Club Lead",
                                    "•",
                                    "CSI Joint Secretary",
                                    "•",
                                ].map((t, idx) => (
                                    <span
                                        key={idx}
                                        className="font-display text-xl md:text-3xl text-[#9CA3AF] uppercase tracking-tight"
                                    >
                                        {t === "•" ? <span className="text-accent">{t}</span> : t}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ResumeModal
                isOpen={resumeModalOpen}
                onClose={() => setResumeModalOpen(false)}
            />
        </>
    );
}
