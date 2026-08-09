import SectionHeader from "./SectionHeader.jsx";
import { COMMUNITY } from "./portfolio.js";
import { Users, Calendar, Sparkles } from "lucide-react";

export default function Community() {
    return (
        <section id="community" data-testid="community-section" className="relative px-6 md:px-12 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    index="05"
                    kicker="Community &amp; Leadership"
                    title="Where I show up for people."
                    subtitle="Communities are where my engineering grew up — leading technical clubs, organizing hackathons and building environments where students ship together."
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {COMMUNITY.map((c, i) => (
                        <div
                            key={c.role + c.org}
                            data-testid={`community-card-${i}`}
                            className={`group relative bg-[#121212] border border-[#2A2A2A] rounded-sm p-8 md:p-10 hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between ${
                                i === 0 || i === 3 ? "md:col-span-6" : "md:col-span-4"
                            }`}
                        >
                            <div>
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-2.5 bg-accent/10 border border-accent/20 rounded-sm text-accent">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280] bg-[#181818] px-2.5 py-1 rounded">
                                        {c.period || `0${i + 1}`}
                                    </span>
                                </div>
                                <h3 className="font-display text-2xl md:text-3xl text-white leading-tight font-bold group-hover:text-accent transition-colors">
                                    {c.role}
                                </h3>
                                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mt-2 font-semibold">
                                    {c.org}
                                </p>
                                <p className="mt-5 text-[#9CA3AF] text-sm md:text-base leading-relaxed">
                                    {c.note}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-[#1F1F1F] flex items-center gap-2 text-xs font-mono text-[#6B7280]">
                                <Sparkles className="w-3.5 h-3.5 text-accent" />
                                <span>Active Leadership &amp; Impact</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
