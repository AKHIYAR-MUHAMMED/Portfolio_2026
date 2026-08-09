import { useState, useEffect } from 'react';
import { Download, Menu, X, Sun, Moon, Eye } from 'lucide-react';
import { PROFILE, NAV_LINKS, getResumeUrl } from './portfolio.js';
import ResumeModal from './ResumeModal.jsx';
import { toast } from 'sonner';

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [resumeModalOpen, setResumeModalOpen] = useState(false);

    // Initialize theme state from document or localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
            toast.info("Switched to Light theme");
        } else {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
            toast.info("Switched to Dark theme");
        }
    };

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
            const pos = window.scrollY + 140;
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

    const handleDirectDownload = (e) => {
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
            <header
                data-testid="nav-header"
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    scrolled
                        ? 'bg-[#0A0A0A]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#222222]'
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <button
                        onClick={() => scrollTo('hero')}
                        className="flex items-center gap-3 group text-left cursor-pointer"
                        aria-label="Back to top"
                    >
                        <span className="font-display font-bold text-xl md:text-2xl text-white tracking-tight group-hover:text-accent transition-colors">
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
                    <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                data-testid={`nav-link-${link.id}`}
                                onClick={() => scrollTo(link.id)}
                                className={`font-mono text-[11px] uppercase tracking-[0.22em] transition-all cursor-pointer py-1 ${
                                    activeSection === link.id
                                        ? 'text-accent border-b-2 border-accent'
                                        : 'text-[#9CA3AF] hover:text-white'
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* Right side controls (Resume & Theme Switch) */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme switch button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-sm border border-[#2A2A2A] hover:border-accent text-[#9CA3AF] hover:text-white transition-all cursor-pointer bg-[#121212]"
                            aria-label="Toggle theme mode"
                            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDark ? (
                                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                            ) : (
                                <Moon className="w-4 h-4 text-blue-400" />
                            )}
                        </button>

                        {/* Preview Resume CTA */}
                        <button
                            onClick={() => setResumeModalOpen(true)}
                            className="inline-flex items-center gap-1.5 border border-[#333333] hover:border-accent text-[#D1D5DB] hover:text-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-all rounded-sm bg-[#141414] cursor-pointer"
                            title="Preview Resume on screen"
                        >
                            <Eye className="w-3.5 h-3.5 text-accent" />
                            <span>Preview</span>
                        </button>

                        {/* Direct Download Resume CTA */}
                        <button
                            onClick={handleDirectDownload}
                            data-testid="nav-resume-btn"
                            className="inline-flex items-center gap-1.5 bg-accent hover:bg-[#FF8B33] text-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all rounded-sm shadow-md font-semibold cursor-pointer"
                            title="Download AKHI_RESUME_18-05.pdf"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>Resume</span>
                        </button>
                    </div>

                    {/* Mobile menu trigger & mobile theme button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-[#9CA3AF] hover:text-white border border-[#2A2A2A] rounded-sm bg-[#121212]"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                        </button>
                        <button
                            className="text-white p-2 border border-[#2A2A2A] rounded-sm bg-[#121212]"
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-[#0D0D0D]/98 backdrop-blur-xl border-b border-[#222222] px-6 pb-6 pt-3 shadow-2xl animate-fade-in">
                        <nav className="flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollTo(link.id)}
                                    className={`text-left font-mono text-xs uppercase tracking-[0.2em] py-2.5 border-b border-[#1C1C1C] transition-colors cursor-pointer ${
                                        activeSection === link.id ? 'text-accent font-bold' : 'text-[#9CA3AF]'
                                    }`}
                                >
                                    {link.label}
                                </button>
                            ))}
                            <div className="flex items-center gap-3 pt-3">
                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        setResumeModalOpen(true);
                                    }}
                                    className="flex-1 inline-flex items-center justify-center gap-2 border border-[#333] text-white py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] rounded-sm bg-[#181818]"
                                >
                                    <Eye className="w-3.5 h-3.5 text-accent" />
                                    Preview Resume
                                </button>
                                <button
                                    onClick={handleDirectDownload}
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-white py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] rounded-sm font-semibold"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    Download PDF
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Resume Preview Modal */}
            <ResumeModal
                isOpen={resumeModalOpen}
                onClose={() => setResumeModalOpen(false)}
            />
        </>
    );
}
