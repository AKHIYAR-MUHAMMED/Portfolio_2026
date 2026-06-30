import SectionHeader from "./SectionHeader.jsx";
import { PROJECTS } from "./portfolio.js";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
    return (
        <section id="projects" data-testid="projects-section" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#0C0C0C]">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    index="04"
                    kicker="Selected Work"
                    title="Things I've built and shipped."
                    subtitle="A growing collection of projects — from internship deliverables to community experiments."
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    {PROJECTS.map((p, i) => (
                        <a
                            key={p.title}
                            href={p.link}
                            data-testid={`project-card-${i}`}
                            className={`group block bg-[#121212] border border-[#2A2A2A] rounded-sm overflow-hidden hover:border-accent transition-colors ${i === 0 ? "md:col-span-8" : "md:col-span-4"
                                } ${i === 1 ? "md:row-span-1" : ""}`}
                        >
                            <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white bg-black/60 backdrop-blur px-2 py-1 rounded-sm">
                                        {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                                    </span>
                                    <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                            <div className="p-6 md:p-8">
                                <h3 className="font-display text-2xl md:text-3xl text-white group-hover:text-accent transition-colors leading-tight">
                                    {p.title}
                                </h3>
                                <p className="mt-3 text-[#9CA3AF] text-sm md:text-base leading-relaxed">
                                    {p.blurb}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {p.stack.map((s) => (
                                        <span
                                            key={s}
                                            className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] border border-[#2A2A2A] px-2 py-1 rounded-sm"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-12">
                    <p className="font-mono text-xs text-[#6B7280]">
                        More projects shipping soon — come back, or{" "}
                        <a href="#contact" className="text-accent link-underline">drop a hello</a>.
                    </p>
                </div>
            </div>
        </section>
    );
}


