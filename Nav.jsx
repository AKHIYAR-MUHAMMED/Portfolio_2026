import { useState, useEffect } from 'react';
import { Download, Menu, X, Sun, Moon } from 'lucide-react';
import { PROFILE, NAV_LINKS } from './portfolio.js';

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileOpen, setMobileOpen] = useState(false);

    // Scroll detection for glass blur effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Scroll spy
    useEffect(() => {
        const allIds = ['hero', ...NAV_LINKS.map((l) => l.id)];
        const handleScroll = () => {
            const pos = window.scrollY + 120;
            for (let i = allIds.length - 1; i >= 0; i--) {
                const el = document.getElementById(allIds[i]);
                if (el && el.offsetTop <= pos) {
                    setActiveSection(allIds[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
        }
    };

    return (
        <header
            data-testid="nav-header"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#000000] backdrop-blur-md border-b border-[#111111]'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-18">
                {/* Logo */}
                <button
                    onClick={() => scrollTo('hero')}
                    className="flex items-center gap-3 group"
                    aria-label="Back to top"
                >
                    <span className="font-display font-bold text-xl text-white tracking-tight">
                        Akhi<span className="text-accent">.</span>
                    </span>
                    <span className="hidden md:flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#6B7280]">
                        <span className="text-[#2A2A2A]">/</span>
                        <span>Data</span>
                        <span className="text-[#2A2A2A]">·</span>
                        <span>Code</span>
                        <span className="text-[#2A2A2A]">·</span>
                        <span>Community</span>
                    </span>
                </button>

                {/* Desktop nav links */}
                <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            data-testid={`nav-link-${link.id}`}
                            onClick={() => scrollTo(link.id)}
                            className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
                                activeSection === link.id
                                    ? 'text-white'
                                    : 'text-[#6B7280] hover:text-white'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Resume CTA */}
                <a
                    href={PROFILE.resumeUrl}
                    download
                    data-testid="nav-resume-btn"
                    className="hidden md:inline-flex items-center gap-2 border border-accent text-accent px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all rounded-sm"
                >
                    <Download className="w-3 h-3" />
                    Resume
                </a>

                {/* Dark mode toggle */}
                <button
                    className="flex items-center gap-2 text-white p-1"
                    onClick={() => {
                        const newMode = !document.documentElement.classList.contains('dark');
                        if (newMode) {
                            document.documentElement.classList.add('dark');
                        } else {
                            document.documentElement.classList.remove('dark');
                        }
                    }}
                    aria-label="Toggle dark mode"
                >
                    
                </button>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-white p-1"
                    onClick={() => setMobileOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1A1A1A] px-6 pb-6 pt-2">
                    <nav className="flex flex-col gap-4">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollTo(link.id)}
                                className={`text-left font-mono text-[11px] uppercase tracking-[0.25em] py-2 border-b border-[#1A1A1A] transition-colors ${
                                    activeSection === link.id ? 'text-accent' : 'text-[#9CA3AF]'
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}
                        <a
                            href={PROFILE.resumeUrl}
                            download
                            className="mt-2 inline-flex items-center gap-2 border border-accent text-accent px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] w-fit rounded-sm"
                        >
                            <Download className="w-3 h-3" />
                            Resume
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
