import { useState } from "react";
import SectionHeader from "./SectionHeader.jsx";
import { POSTS } from "./portfolio.js";
import { ArrowUpRight, BookOpen, Clock, Calendar } from "lucide-react";
import ArticleModal from "./ArticleModal.jsx";

export default function Writing() {
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <>
            <section id="writing" data-testid="writing-section" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#0C0C0C]">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        index="06"
                        kicker="Writing &amp; Thoughts"
                        title="Notes, essays, and learning-in-public."
                        subtitle="A space for engineering reflections, project post-mortems and lessons learned along the path."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {POSTS.map((p, i) => (
                            <article
                                key={p.id || p.title}
                                data-testid={`post-card-${i}`}
                                onClick={() => setSelectedPost(p)}
                                className="group bg-[#121212] border border-[#2A2A2A] rounded-sm p-8 hover:border-accent transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-sm"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-semibold px-2.5 py-1 bg-accent/10 rounded">
                                            {p.tag}
                                        </span>
                                        <span className="font-mono text-xs text-[#6B7280] flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {p.read}
                                        </span>
                                    </div>
                                    <h3 className="font-display text-xl md:text-2xl text-white font-bold leading-snug group-hover:text-accent transition-colors">
                                        {p.title}
                                    </h3>
                                    <p className="mt-4 text-[#9CA3AF] text-sm leading-relaxed line-clamp-3">
                                        {p.excerpt}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center justify-between border-t border-[#222222] pt-4">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280] flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        {p.date}
                                    </span>
                                    <span className="inline-flex items-center gap-1 font-mono text-xs text-accent font-semibold group-hover:translate-x-0.5 transition-transform">
                                        Read Essay <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Article Modal Reader */}
            <ArticleModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
            />
        </>
    );
}
