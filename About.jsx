import { useState } from "react";
import SectionHeader from "./SectionHeader.jsx";
import { PROFILE, getResumeUrl } from "./portfolio.js";
import { Download, Eye, Sparkles } from "lucide-react";
import ResumeModal from "./ResumeModal.jsx";
import { toast } from "sonner";

export default function About() {
    const [resumeModalOpen, setResumeModalOpen] = useState(false);

    const handleDownloadResume = (e) => {
        e.preventDefault();
        const url = getResumeUrl();
        const link = document.createElement('a');
        link.href = url;
        link.download = 'AKHI_RESUME_18-05.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Downloading Akhiyar's Resume (AKHI_RESUME_18-05.pdf)");
    };

    return (
        <>
            <section id="about" data-testid="about-section" className="relative px-6 md:px-12 py-24 md:py-32">
                <div className="max-w-7xl mx-auto bg-[#111111] border border-[#2A2A2A] p-8 md:p-14 rounded-lg shadow-xl">
                    <SectionHeader
                        index="01"
                        kicker="About Me"
                        title="Builder by discipline, problem solver by mindset."
                        subtitle={PROFILE.summary}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14">
                        <div className="md:col-span-7 space-y-6">
                            <p className="font-body text-lg md:text-xl text-[#F3F4F6] leading-relaxed">
                                {PROFILE.longBio}
                            </p>
                            <p className="font-body text-base md:text-lg text-[#9CA3AF] leading-relaxed">
                                I believe the most transformative software lives at the intersection of rigorous data science and thoughtful, intuitive engineering. Whether it's architecting real-time machine learning pipelines, mentoring first-time hackathon builders, or crafting high-performance user interfaces, I focus on shipping software that creates tangible value.
                            </p>

                            <div className="pt-4 flex flex-wrap items-center gap-4">
                                <button
                                    onClick={handleDownloadResume}
                                    className="inline-flex items-center gap-2 bg-accent hover:bg-[#FF8B33] text-white px-5 py-3 rounded-sm font-mono text-xs uppercase tracking-wider transition-all cursor-pointer font-semibold shadow"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Resume (PDF)
                                </button>
                                <button
                                    onClick={() => setResumeModalOpen(true)}
                                    className="inline-flex items-center gap-2 border border-[#333] hover:border-accent text-[#D1D5DB] hover:text-white px-4 py-3 rounded-sm font-mono text-xs uppercase tracking-wider transition-all cursor-pointer bg-[#161616]"
                                >
                                    <Eye className="w-4 h-4 text-accent" />
                                    Preview Document
                                </button>
                            </div>
                        </div>

                        <aside className="md:col-span-5 md:pl-10 md:border-l border-[#2A2A2A]">
                            <h4 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-6 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Quick Overview
                            </h4>
                            <ul className="space-y-5">
                                {[
                                    { k: "Current Focus", v: "Data Science, Machine Learning, Full-Stack Architecture" },
                                    { k: "Primary Tools", v: "Python · Pandas · React · Node.js · FastAPI · Git" },
                                    { k: "Open For", v: "Internships · Full-Time Roles · Hackathons · Collabs" },
                                    { k: "Community", v: "CSI Joint Secretary · Hack Club Lead · NSS Volunteer" },
                                    { k: "Languages", v: "English · Malayalam · Hindi · Tamil · Arabic" },
                                ].map((row) => (
                                    <li key={row.k} className="grid grid-cols-3 gap-3 border-b border-[#1F1F1F] pb-4">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7280] col-span-1 font-medium">
                                            {row.k}
                                        </span>
                                        <span className="text-[#F3F4F6] text-sm col-span-2">{row.v}</span>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </div>
            </section>

            <ResumeModal
                isOpen={resumeModalOpen}
                onClose={() => setResumeModalOpen(false)}
            />
        </>
    );
}
