import SectionHeader from "./SectionHeader.jsx";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "./portfolio.js";
import { Award } from "lucide-react";

export default function Experience() {
    return (
        <section id="experience" data-testid="experience-section" className="relative px-6 md:px-12 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    index="03"
                    kicker="Trajectory"
                    title="Experience, education & certifications."
                    subtitle="The path so far — internships, classrooms, and the little credentials I'm proud of."
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Experience + Education timeline */}
                    <div className="md:col-span-7 space-y-12">
                        <Timeline title="Experience" items={EXPERIENCE.map((e) => ({
                            top: e.role,
                            sub: e.company,
                            meta: e.period,
                            body: (
                                <ul className="mt-3 space-y-2">
                                    {e.bullets.map((b, i) => (
                                        <li key={i} className="text-[#9CA3AF] text-base flex gap-3">
                                            <span className="text-accent mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            ),
                        }))} />

                        <Timeline title="Education" items={EDUCATION.map((e) => ({
                            top: e.degree,
                            sub: e.institution,
                            meta: e.period,
                            body: <p className="mt-3 text-[#9CA3AF]">{e.detail}</p>,
                        }))} />
                    </div>

                    {/* Certifications */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <Award className="w-5 h-5 text-accent" />
                            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#9CA3AF]">
                                Certifications &amp; Workshops
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {CERTIFICATIONS.map((c, i) => (
                                <li
                                    key={c.title}
                                    data-testid={`cert-${i}`}
                                    className="group flex items-start justify-between gap-4 border border-[#2A2A2A] bg-[#121212] p-4 rounded-sm hover:border-accent transition-colors"
                                >
                                    <div>
                                        <p className="text-white font-medium">{c.title}</p>
                                        <p className="font-mono text-xs text-[#9CA3AF] mt-1">{c.issuer}</p>
                                    </div>
                                    <span className="font-mono text-[10px] text-[#6B7280] group-hover:text-accent transition-colors">
                                        /{String(i + 1).padStart(2, "0")}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Timeline({ title, items }) {
    return (
        <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#9CA3AF] mb-6">
                {title}
            </h3>
            <ol className="relative border-l border-[#2A2A2A] pl-8 space-y-10">
                {items.map((it, i) => (
                    <li key={i} className="relative">
                        <span className="absolute -left-[35px] top-2 w-3 h-3 rounded-full bg-accent glow-accent" />
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h4 className="font-display text-2xl md:text-3xl text-white tracking-tight">
                                {it.top}
                            </h4>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                                {it.meta}
                            </span>
                        </div>
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9CA3AF] mt-1">
                            {it.sub}
                        </p>
                        {it.body}
                    </li>
                ))}
            </ol>
        </div>
    );
}


