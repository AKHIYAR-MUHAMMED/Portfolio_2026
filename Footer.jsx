import { PROFILE, NAV_LINKS } from "./portfolio.js";
import { ArrowUp } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer data-testid="site-footer" className="relative border-t border-[#2A2A2A] bg-[#0A0A0A] px-6 md:px-12 pt-16 pb-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
                    <div className="md:col-span-7">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
                            Currently open to opportunities
                        </p>
                        <h3 className="font-display text-3xl md:text-5xl text-white leading-tight tracking-tighter">
                            Have an idea, an internship, or a hackathon?
                            <br />
                            <a
                                href={`mailto:${PROFILE.email}`}
                                className="text-accent link-underline"
                                data-testid="footer-email-link"
                            >
                                Let's talk →
                            </a>
                        </h3>
                    </div>

                    <div className="md:col-span-5 md:pl-10 md:border-l border-[#2A2A2A]">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] mb-4">
                            Sitemap
                        </p>
                        <ul className="grid grid-cols-2 gap-3">
                            {NAV_LINKS.map((l) => (
                                <li key={l.id}>
                                    <a
                                        href={`#${l.id}`}
                                        data-testid={`footer-nav-${l.id}`}
                                        className="text-[#9CA3AF] hover:text-accent transition-colors text-sm"
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-[#1F1F1F]">
                    <p className="font-mono text-[11px] text-[#6B7280]">
                        © {year} {PROFILE.name}. Designed &amp; built with intent.
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        data-testid="footer-scroll-top"
                        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] hover:text-accent transition-colors"
                    >
                        Back to top
                        <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

