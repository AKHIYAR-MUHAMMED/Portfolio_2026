import { useState } from "react";
import { ArrowUpRight, Download, MapPin, Eye, Sparkles } from "lucide-react";
import { PROFILE, getResumeUrl } from "./portfolio.js";
import ResumeModal from "./ResumeModal.jsx";
import { toast } from "sonner";

export default function Hero() {
    const [resumeModalOpen, setResumeModalOpen] = useState(false);

    const handleDownloadResume = (e) => {
        e.preventDefault();
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
            <section id="hero" data-testid="hero-section" className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 overflow-hidden">
                {/* Background accent */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden>
                    <img
                        src="https://images.pexels.com/photos/10325707/pexels-photo-10325707.png"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
                </div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Overline with status pill */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 fade-up" style={{ animationDelay: "0.05s" }}>
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-px bg-accent" />
                            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-accent font-semibold">
                                Portfolio / 2026
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full font-mono text-[10px] uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Available for Internships & Projects</span>
                        </div>
                    </div>

                    {/* Name */}
                    <h1
                        data-testid="hero-name"
                        className="font-display font-semibold text-[15vw] md:text-[10.5vw] leading-[0.85] tracking-tighter text-white fade-up select-none"
                        style={{ animationDelay: "0.15s" }}
                    >
                        Akhiyar
                        <br />
                        <span className="text-accent">Muhammed</span>
                        <span className="text-accent cursor-blink">_</span>
                    </h1>

                    {/* Subhead grid */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-7 fade-up" style={{ animationDelay: "0.3s" }}>
                            <p className="font-body text-xl md:text-2xl text-[#E5E7EB] leading-relaxed max-w-2xl">
                                Data Science engineer + full-stack builder. Specializing in Python, machine learning models, and modern React architectures to transform data into human-centered software.
                            </p>
                            
                            {/* CTA Action Bar */}
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <a
                                    data-testid="hero-cta-work"
                                    href="#projects"
                                    onClick={(e) => {
                                        e.preventDefault();
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
                                    className="inline-flex items-center gap-2 border border-[#333333] hover:border-accent bg-[#141414] hover:bg-[#1A1A1A] text-white px-5 py-3.5 rounded-sm font-mono text-xs uppercase tracking-[0.18em] transition-all cursor-pointer"
                                    title="Download AKHI_RESUME_18-05.pdf"
                                >
                                    <Download className="w-4 h-4 text-accent" />
                                    <span>Download Resume</span>
                                </button>

                                <button
                                    onClick={() => setResumeModalOpen(true)}
                                    className="inline-flex items-center gap-2 border border-[#262626] hover:border-accent/60 text-[#9CA3AF] hover:text-white px-4 py-3.5 rounded-sm font-mono text-xs uppercase tracking-[0.18em] transition-all cursor-pointer"
                                    title="Quick Preview Resume"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Preview</span>
                                </button>

                                <a
                                    data-testid="hero-cta-contact"
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="font-mono text-xs uppercase tracking-[0.18em] text-[#9CA3AF] hover:text-white link-underline cursor-pointer py-2"
                                >
                                    Or say hello →
                                </a>
                            </div>
                        </div>

                        {/* Stat / meta column */}
                        <div className="md:col-span-5 md:pl-8 md:border-l border-[#2A2A2A] fade-up" style={{ animationDelay: "0.45s" }}>
                            <div className="space-y-6">
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                                        Education &amp; Focus
                                    </p>
                                    <p className="mt-2 text-white text-base">
                                        Pursuing <span className="text-accent font-semibold">B.Tech in Data Science</span> at Adi Shankara
                                        Institute of Engineering &amp; Technology (2024 — 2027).
                                    </p>
                                </div>
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                                        Location
                                    </p>
                                    <p className="mt-2 flex items-center gap-2 text-white">
                                        <MapPin className="w-4 h-4 text-accent" />
                                        {PROFILE.location}
                                    </p>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#1C1C1C]">
                                    <Stat label="Years coding" value="4+" />
                                    <Stat label="Communities led" value="5" />
                                    <Stat label="Languages" value="5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marquee ticker */}
                <div className="relative mt-24 md:mt-32 border-y border-[#2A2A2A] overflow-hidden bg-[#0D0D0D]">
                    <div className="marquee-track flex whitespace-nowrap py-6">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex shrink-0 items-center gap-12 pr-12">
                                {[
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
                                    "Team Leadership",
                                    "•",
                                    "Hack Club Lead",
                                    "•",
                                    "CSI Joint Secretary",
                                    "•",
                                ].map((t, idx) => (
                                    <span
                                        key={idx}
                                        className="font-display text-2xl md:text-4xl text-[#9CA3AF] uppercase tracking-tight"
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

function Stat({ label, value }) {
    return (
        <div>
            <div className="font-display text-3xl md:text-4xl text-white font-bold">{value}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7280] mt-1">
                {label}
            </div>
        </div>
    );
}
