import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { PROFILE } from "./portfolio.js";

export default function Hero() {
    return (
        <section id="hero" data-testid="hero-section" className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 overflow-hidden">
            {/* Background accent — abstract orange network */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden>
                <img
                    src="https://images.pexels.com/photos/10325707/pexels-photo-10325707.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Overline */}
                <div className="flex items-center gap-3 mb-8 fade-up" style={{ animationDelay: "0.05s" }}>
                    <span className="w-10 h-px bg-accent" />
                    <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-accent">
                        Portfolio / 2026
                    </p>
                </div>

                {/* Name */}
                <h1
                    data-testid="hero-name"
                    className="font-display font-semibold text-[15vw] md:text-[10.5vw] leading-[0.85] tracking-tighter text-white fade-up"
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
                        <p className="font-body text-xl md:text-2xl text-primary leading-relaxed max-w-2xl">
                            Data Science engineer + full-stack builder. I write Python &amp; React, lead student
                            communities, and turn rough ideas into shippable products.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <a
                                data-testid="hero-cta-work"
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="group inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-[0.18em] hover:bg-accent transition-colors"
                            >
                                See my work
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <a
                                data-testid="hero-cta-resume"
                                href={PROFILE.resumeUrl}
                                download
                                className="inline-flex items-center gap-2 border border border-subtle text-white px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-[0.18em] hover:border-accent hover:text-accent transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Download resume
                            </a>
                            <a
                                data-testid="hero-cta-contact"
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="font-mono text-xs uppercase tracking-[0.18em] text-secondary hover:text-white link-underline"
                            >
                                Or just say hi →
                            </a>
                        </div>
                    </div>

                    {/* Stat / meta column */}
                    <div className="md:col-span-5 md:pl-8 md:border-l border-[#2A2A2A] fade-up" style={{ animationDelay: "0.45s" }}>
                        <div className="space-y-6">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                                    Currently
                                </p>
                                <p className="mt-2 text-white">
                                    Pursuing <span className="text-accent">B.Tech in Data Science</span> at Adi Shankara
                                    Institute of Engineering &amp; Technology.
                                </p>
                            </div>
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                                    Based in
                                </p>
                                <p className="mt-2 flex items-center gap-2 text-white">
                                    <MapPin className="w-4 h-4 text-accent" />
                                    {PROFILE.location}
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-2">
                                <Stat label="Years coding" value="4+" />
                                <Stat label="Communities led" value="5" />
                                <Stat label="Languages" value="5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee */}
            <div className="relative mt-24 md:mt-32 border-y border-[#2A2A2A] overflow-hidden">
                <div className="marquee-track flex whitespace-nowrap py-6">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex shrink-0 items-center gap-12 pr-12">
                            {[
                                "Data Science",
                                "•",
                                "Full Stack",
                                "•",
                                "Python",
                                "•",
                                "React",
                                "•",
                                "Machine Learning",
                                "•",
                                "Team Building",
                                "•",
                                "Hack Club",
                                "•",
                                "CSI ASIET",
                                "•",
                            ].map((t, idx) => (
                                <span
                                    key={idx}
                                    className="font-display text-3xl md:text-5xl text-[#9CA3AF] uppercase tracking-tight"
                                >
                                    {t === "•" ? <span className="text-accent">{t}</span> : t}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Stat({ label, value }) {
    return (
        <div>
            <div className="font-display text-3xl md:text-4xl text-white">{value}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7280] mt-1">
                {label}
            </div>
        </div>
    );
}


