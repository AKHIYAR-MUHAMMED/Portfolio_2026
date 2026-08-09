import { useState } from "react";
import SectionHeader from "./SectionHeader.jsx";
import { PROJECTS } from "./portfolio.js";
import { ArrowUpRight, Github, ExternalLink, Filter } from "lucide-react";
import ProjectModal from "./ProjectModal.jsx";

const CATEGORIES = ["All", "Full Stack", "Data Science", "AI & ML", "Community"];

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = activeFilter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter || p.stack.some(s => s.toLowerCase().includes(activeFilter.toLowerCase())));

    return (
        <>
            <section id="projects" data-testid="projects-section" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#0C0C0C]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <SectionHeader
                            index="04"
                            kicker="Selected Work"
                            title="Things I've built, engineered and shipped."
                            subtitle="A curated showcase of applications, machine learning experiments, and community build systems."
                        />

                        {/* Filter Switcher Tabs */}
                        <div className="flex flex-wrap items-center gap-2 bg-[#141414] p-1.5 border border-[#262626] rounded-sm self-start md:self-auto">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                                        activeFilter === cat
                                            ? "bg-accent text-white font-semibold shadow"
                                            : "text-[#9CA3AF] hover:text-white hover:bg-[#202020]"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Project Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                        {filteredProjects.map((p, i) => (
                            <div
                                key={p.id || p.title}
                                data-testid={`project-card-${i}`}
                                onClick={() => setSelectedProject(p)}
                                className={`group bg-[#121212] border border-[#2A2A2A] rounded-sm overflow-hidden hover:border-accent transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                                    i === 0 ? "md:col-span-8" : "md:col-span-4"
                                }`}
                            >
                                <div>
                                    <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"} bg-black`}>
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-90"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />
                                        
                                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white bg-black/70 backdrop-blur px-2.5 py-1 rounded-sm border border-white/10">
                                                {p.category || "Project"}
                                            </span>
                                            <div className="p-2 bg-black/60 backdrop-blur rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight className="w-4 h-4 text-accent" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8">
                                        <h3 className="font-display text-2xl md:text-3xl text-white group-hover:text-accent transition-colors leading-tight font-bold">
                                            {p.title}
                                        </h3>
                                        <p className="mt-3 text-[#9CA3AF] text-sm md:text-base leading-relaxed line-clamp-3">
                                            {p.blurb}
                                        </p>
                                        
                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {p.stack.slice(0, 4).map((s) => (
                                                <span
                                                    key={s}
                                                    className="font-mono text-[10px] uppercase tracking-wider text-[#9CA3AF] bg-[#181818] border border-[#2A2A2A] px-2 py-1 rounded-sm"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                            {p.stack.length > 4 && (
                                                <span className="font-mono text-[10px] text-accent px-1 py-1">
                                                    +{p.stack.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Card bottom action bar */}
                                <div className="px-6 md:px-8 py-4 border-t border-[#1F1F1F] bg-[#0E0E0E] flex items-center justify-between">
                                    <span className="font-mono text-xs text-accent flex items-center gap-1 group-hover:underline">
                                        View details &amp; architecture →
                                    </span>
                                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                        {p.github && (
                                            <a
                                                href={p.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-[#222] rounded transition-colors"
                                                title="View GitHub Repository"
                                            >
                                                <Github className="w-4 h-4" />
                                            </a>
                                        )}
                                        {p.demo && (
                                            <a
                                                href={p.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 text-[#9CA3AF] hover:text-accent hover:bg-[#222] rounded transition-colors"
                                                title="Live Preview"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#1F1F1F] pt-8">
                        <p className="font-mono text-xs text-[#6B7280]">
                            Showing {filteredProjects.length} of {PROJECTS.length} curated projects.
                        </p>
                        <a 
                            href="#contact" 
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="font-mono text-xs text-accent hover:underline flex items-center gap-1"
                        >
                            Have a project idea? Let's build it together →
                        </a>
                    </div>
                </div>
            </section>

            {/* Project Details Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
}
