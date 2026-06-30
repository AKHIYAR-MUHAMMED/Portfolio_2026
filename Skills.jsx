import SectionHeader from "./SectionHeader.jsx";
import { SKILL_GROUPS } from "./portfolio.js";

export default function Skills() {
    return (
        <section id="skills" data-testid="skills-section" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#0C0C0C]">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    index="02"
                    kicker="Stack"
                    title="A toolkit that bridges data, code, and people."
                    subtitle="From cleaning a messy CSV to leading a team through a hackathon weekend — these are the muscles I keep sharp."
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {SKILL_GROUPS.map((g, idx) => (
                        <div
                            key={g.title}
                            data-testid={`skill-group-${idx}`}
                            className={`group bg-[#121212] border border-[#2A2A2A] p-8 md:p-10 rounded-sm hover:border-accent transition-colors ${idx === 0 ? "md:col-span-7" : idx === 1 ? "md:col-span-5" : idx === 2 ? "md:col-span-5" : "md:col-span-7"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-2xl md:text-3xl text-white">{g.title}</h3>
                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                                    {g.tag}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {g.items.map((t) => (
                                    <span
                                        key={t}
                                        className="font-mono text-xs px-3 py-1.5 border border-[#2A2A2A] text-[#F3F4F6] rounded-sm hover:border-accent hover:text-accent transition-colors"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

