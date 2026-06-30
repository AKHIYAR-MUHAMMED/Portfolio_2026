import SectionHeader from "./SectionHeader.jsx";
import { POSTS } from "./portfolio.js";
import { ArrowUpRight } from "lucide-react";

export default function Writing() {
    return (
        <section id="writing" data-testid="writing-section" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#0C0C0C]">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    index="06"
                    kicker="Writing"
                    title="Notes, essays, and learning-in-public."
                    subtitle="A space for half-formed ideas, project post-mortems and short essays. Launching soon — subscribe via the contact form below."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {POSTS.map((p, i) => (
                        <article
                            key={p.title}
                            data-testid={`post-card-${i}`}
                            className="group bg-[#121212] border border-[#2A2A2A] rounded-sm p-8 hover:border-accent transition-colors flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                                    {p.tag}
                                </span>
                                <span className="font-mono text-[10px] text-[#6B7280]">{p.read}</span>
                            </div>
                            <h3 className="font-display text-xl md:text-2xl text-white leading-snug group-hover:text-accent transition-colors">
                                {p.title}
                            </h3>
                            <p className="mt-4 text-[#9CA3AF] text-sm leading-relaxed flex-1">{p.excerpt}</p>
                            <div className="mt-6 flex items-center justify-between border-t border-[#2A2A2A] pt-4">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7280]">
                                    {p.date}
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-[#6B7280] group-hover:text-accent transition-colors" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}


