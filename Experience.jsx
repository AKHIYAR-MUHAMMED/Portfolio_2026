import { useState } from "react";
import SectionHeader from "./SectionHeader.jsx";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "./portfolio.js";
import { Award, Briefcase, GraduationCap, ChevronRight } from "lucide-react";
import CertificationModal from "./CertificationModal.jsx";
import TiltCard from "./TiltCard.jsx";
import { sound } from "./audio.js";

export default function Experience() {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <>
            <section id="experience" data-testid="experience-section" className="relative px-6 md:px-12 py-24 md:py-32">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        index="03"
                        kicker="Trajectory"
                        title="Experience, education &amp; verified credentials."
                        subtitle="The path so far — industry internships, academic training in Data Science, and specialized engineering certifications."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        {/* Experience + Education timeline */}
                        <div className="md:col-span-7 space-y-12">
                            <Timeline 
                                icon={<Briefcase className="w-4 h-4 text-accent" />}
                                title="Professional Experience &amp; Internships" 
                                items={EXPERIENCE.map((e) => ({
                                    top: e.role,
                                    sub: e.company,
                                    meta: e.period,
                                    type: e.type,
                                    body: (
                                        <ul className="mt-3 space-y-2">
                                            {e.bullets.map((b, i) => (
                                                <li key={i} className="text-[#9CA3AF] text-sm md:text-base flex gap-3 leading-relaxed">
                                                    <span className="text-accent mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ),
                                }))} 
                            />

                            <Timeline 
                                icon={<GraduationCap className="w-4 h-4 text-accent" />}
                                title="Education" 
                                items={EDUCATION.map((e) => ({
                                    top: e.degree,
                                    sub: e.institution,
                                    meta: e.period,
                                    body: <p className="mt-3 text-[#9CA3AF] text-sm md:text-base leading-relaxed">{e.detail}</p>,
                                }))} 
                            />
                        </div>

                        {/* Certifications with Clickable Details */}
                        <div className="md:col-span-5">
                            <div className="flex items-center gap-3 mb-6">
                                <Award className="w-5 h-5 text-accent" />
                                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white font-semibold">
                                    Certifications &amp; Credentials
                                </h3>
                            </div>
                            <p className="font-mono text-[11px] text-[#6B7280] mb-4">
                                Click on any certificate to view verified credentials &amp; syllabus:
                            </p>
                            <ul className="space-y-3">
                                {CERTIFICATIONS.map((c, i) => (
                                    <li key={c.title}>
                                        <TiltCard maxTilt={8} scale={1.02}>
                                            <div
                                                data-testid={`cert-${i}`}
                                                onClick={() => {
                                                    sound.playClick();
                                                    setSelectedCert(c);
                                                }}
                                                onMouseEnter={() => sound.playHover()}
                                                className="group flex items-start justify-between gap-4 border border-white/12 bg-[#121218]/45 backdrop-blur-xl p-4 rounded-xl hover:border-accent hover:bg-[#161622]/60 transition-all cursor-pointer shadow-xl"
                                            >
                                                <div className="flex-1">
                                                    <p className="text-white font-semibold text-sm group-hover:text-accent transition-colors flex items-center gap-1.5">
                                                        <span>{c.title}</span>
                                                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                                                    </p>
                                                    <p className="font-mono text-xs text-[#9CA3AF] mt-1">{c.issuer}</p>
                                                </div>
                                                <span className="font-mono text-[10px] text-[#6B7280] group-hover:text-accent transition-colors px-2 py-1 bg-[#1A1A24]/60 border border-white/10 rounded">
                                                    {c.date || `0${i + 1}`}
                                                </span>
                                            </div>
                                        </TiltCard>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credential Details Modal */}
            <CertificationModal
                cert={selectedCert}
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
            />
        </>
    );
}

function Timeline({ title, items, icon }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                {icon}
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-white font-semibold">
                    {title}
                </h3>
            </div>
            <ol className="relative border-l border-white/10 pl-8 space-y-8">
                {items.map((it, i) => (
                    <li key={i} className="relative">
                        <span className="absolute -left-[37px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent glow-accent border-2 border-black" />
                        <TiltCard maxTilt={5} scale={1.01} glare={false}>
                            <div className="bg-[#121218]/45 backdrop-blur-xl border border-white/12 p-6 rounded-xl shadow-2xl hover:border-accent/60 transition-all">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h4 className="font-display text-2xl md:text-3xl text-white tracking-tight font-bold">
                                        {it.top}
                                    </h4>
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-semibold px-2 py-0.5 bg-accent/10 rounded">
                                        {it.meta}
                                    </span>
                                </div>
                                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9CA3AF] mt-1 font-medium">
                                    {it.sub}
                                </p>
                                {it.body}
                            </div>
                        </TiltCard>
                    </li>
                ))}
            </ol>
        </div>
    );
}
