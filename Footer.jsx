import { PROFILE, NAV_LINKS, SOCIAL } from "./portfolio.js";
import { ArrowUp, Heart, Github, Linkedin, Mail, Phone } from "lucide-react";

const SOCIAL_ICONS = { Github, Linkedin, Mail, Phone };

export default function Footer() {
    const year = new Date().getFullYear();

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
        }
    };

    return (
        <footer data-testid="site-footer" className="relative border-t border-[#2A2A2A] bg-[#0A0A0A] px-6 md:px-12 pt-16 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
                    <div className="md:col-span-7 space-y-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
                            Currently open to opportunities
                        </p>
                        <h3 className="font-display text-3xl md:text-5xl text-white leading-tight tracking-tighter font-bold">
                            Have an idea, an internship, or a collaborative project?
                            <br />
                            <a
                                href={`mailto:${PROFILE.email}`}
                                className="text-accent hover:underline inline-block mt-2"
                                data-testid="footer-email-link"
                            >
                                Let's talk →
                            </a>
                        </h3>

                        {/* Social Links Row */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            {SOCIAL.map((s) => {
                                const Icon = SOCIAL_ICONS[s.icon];
                                if (!Icon || (s.icon !== 'Github' && s.icon !== 'Linkedin' && s.icon !== 'Mail')) return null;
                                return (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target={s.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        data-testid={`footer-social-${s.label.toLowerCase()}`}
                                        className="inline-flex items-center gap-1.5 text-[#6B7280] hover:text-accent transition-colors font-mono text-xs border border-[#1F1F1F] hover:border-accent/50 px-3 py-1.5 rounded-sm bg-[#111]"
                                        title={s.label}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span>{s.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="md:col-span-5 md:pl-10 md:border-l border-[#2A2A2A]">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B7280] mb-4 font-semibold">
                            Navigation Sitemap
                        </p>
                        <ul className="grid grid-cols-2 gap-3">
                            {NAV_LINKS.map((l) => (
                                <li key={l.id}>
                                    <button
                                        onClick={() => scrollTo(l.id)}
                                        data-testid={`footer-nav-${l.id}`}
                                        className="text-[#9CA3AF] hover:text-accent transition-colors text-sm font-mono uppercase tracking-wider text-left cursor-pointer"
                                    >
                                        {l.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-[#1F1F1F]">
                    <p className="font-mono text-[11px] text-[#6B7280] flex items-center gap-1.5">
                        <span>© {year}</span>
                        <a
                            href="https://www.linkedin.com/in/akhiyar-muhammed"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline"
                        >
                            {PROFILE.name}
                        </a>
                        <span>· Built with</span>
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                        <span>and modern React + Data Science.</span>
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        data-testid="footer-scroll-top"
                        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] hover:text-accent transition-colors cursor-pointer bg-[#141414] px-4 py-2 rounded-sm border border-[#222] hover:border-accent/40"
                    >
                        <span>Back to top</span>
                        <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
