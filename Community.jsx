import SectionHeader from "./SectionHeader.jsx";
import { COMMUNITY } from "./portfolio.js";
import { Users } from "lucide-react";

export default function Community() {
    return (
        <section id="community" data-testid="community-section" className="relative px-6 md:px-12 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    index="05"
                    kicker="Community & Leadership"
                    title="Where I show up for people."
                    subtitle="Communities are where my engineering grew up — leading clubs, running events and building rooms where students ship together."
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {COMMUNITY.map((c, i) => (
                        <div
                            key={c.role + c.org}
                            data-testid={`community-card-${i}`}
                            className={`group relative bg-[#121212] border border-[#2A2A2A] rounded-sm p-8 md:p-10 hover:border-accent transition-all hover:-translate-y-1 duration-300 ${i === 0 || i === 3 ? "md:col-span-6" : "md:col-span-4"
                                }`}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <Users className="w-6 h-6 text-accent" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                                    /{String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <h3 className="font-display text-2xl md:text-3xl text-white leading-tight group-hover:text-accent transition-colors">
                                {c.role}
                            </h3>
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9CA3AF] mt-2">
                                {c.org}
                            </p>
                            <p className="mt-5 text-[#9CA3AF] leading-relaxed">{c.note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


