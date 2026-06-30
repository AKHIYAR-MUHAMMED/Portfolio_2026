import SectionHeader from "./SectionHeader.jsx";
import { PROFILE } from "./portfolio.js";

export default function About() {
    return (
        <section id="about" data-testid="about-section" className="relative px-6 md:px-12 py-24 md:py-32">
            <div className="max-w-7xl mx-auto bg-[#111111] border border-[#2A2A2A] p-8 md:p-12 rounded-[var(--radius-card)]">
                <SectionHeader
                    index="01"
                    kicker="About"
                    title="Builder by training, communicator by instinct."
                    subtitle={PROFILE.summary}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-7">
                        <p className="font-body text-lg md:text-xl text-[#F3F4F6] leading-relaxed">
                            {PROFILE.longBio}
                        </p>
                        <p className="font-body text-base md:text-lg text-[#9CA3AF] leading-relaxed mt-6">
                            I think of myself as part engineer, part product person, part community organizer. I
                            love jumping into messy problems, breaking them into small pieces, and building things
                            with people I trust. If it ships, teaches someone, or makes the next student feel less
                            alone — I'm in.
                        </p>
                    </div>

                    <aside className="md:col-span-5 md:pl-10 md:border-l border-[#2A2A2A]">
                        <ul className="space-y-6">
                            {[
                                { k: "Currently learning", v: "Deep Learning, MLOps, System Design" },
                                { k: "Tools I live in", v: "VS Code · Jupyter · Figma · GitHub" },
                                { k: "Open to", v: "Internships · Hackathons · Co-builders · Mentorship" },
                                { k: "Off-keyboard", v: "Team sports, meditation, design talks" },
                            ].map((row) => (
                                <li key={row.k} className="grid grid-cols-3 gap-3 border-b border-[#1F1F1F] pb-4">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7280] col-span-1">
                                        {row.k}
                                    </span>
                                    <span className="text-[#F3F4F6] col-span-2">{row.v}</span>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </div>
        </section>
    );
}


