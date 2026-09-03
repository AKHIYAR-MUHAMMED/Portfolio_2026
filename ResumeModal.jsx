import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    X,
    Download,
    ExternalLink,
    FileText,
    CheckCircle2,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    Maximize2,
    Printer,
    Sparkles,
    Layout,
    AlertCircle,
    Loader2,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Mail,
    Phone,
    Linkedin,
    Github,
    Award,
    Briefcase,
    GraduationCap,
    Code2,
    Users
} from 'lucide-react';
import {
    PROFILE,
    SOCIAL,
    EDUCATION,
    EXPERIENCE,
    SKILL_GROUPS,
    CERTIFICATIONS,
    COMMUNITY,
    PROJECTS,
    getResumeUrl
} from './portfolio.js';
import { toast } from 'sonner';

// Import PDF.js
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function ResumeModal({ isOpen, onClose }) {
    const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'interactive'
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1.15);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [pdfDoc, setPdfDoc] = useState(null);

    const canvasRefs = useRef([]);
    const containerRef = useRef(null);
    const renderTasksRef = useRef([]);

    const resumeUrl = getResumeUrl();

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Load PDF Document when modal opens
    useEffect(() => {
        if (!isOpen) {
            // Clean up
            setPdfDoc(null);
            setNumPages(0);
            setIsLoading(true);
            setLoadError(null);
            return;
        }

        let isCancelled = false;
        setIsLoading(true);
        setLoadError(null);

        const loadPdf = async () => {
            try {
                // Try fetching primary URL with cmaps
                const loadingTask = pdfjsLib.getDocument({
                    url: resumeUrl,
                    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
                    cMapPacked: true,
                });

                const doc = await loadingTask.promise;
                if (!isCancelled) {
                    setPdfDoc(doc);
                    setNumPages(doc.numPages);
                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                console.warn("Primary PDF URL with cMaps failed, trying simple load:", err);
                try {
                    const fallbackTask = pdfjsLib.getDocument({ url: resumeUrl });
                    const fallbackDoc = await fallbackTask.promise;
                    if (!isCancelled) {
                        setPdfDoc(fallbackDoc);
                        setNumPages(fallbackDoc.numPages);
                        setIsLoading(false);
                        return;
                    }
                } catch (fallbackErr) {
                    console.error("Failed to load PDF:", fallbackErr);
                    if (!isCancelled) {
                        setLoadError(fallbackErr.message || "Failed to load PDF preview");
                        setIsLoading(false);
                    }
                }
            }
        };

        loadPdf();

        return () => {
            isCancelled = true;
        };
    }, [isOpen, resumeUrl]);

    // Cancel ongoing render tasks
    const cancelOngoingRenders = () => {
        renderTasksRef.current.forEach((task) => {
            try {
                if (task && task.cancel) task.cancel();
            } catch (e) {
                // ignore
            }
        });
        renderTasksRef.current = [];
    };

    // Render pages onto canvases
    const renderPages = useCallback(async () => {
        if (!pdfDoc || viewMode !== 'pdf') return;

        cancelOngoingRenders();

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            const canvas = canvasRefs.current[pageNum - 1];
            if (!canvas) continue;

            try {
                const page = await pdfDoc.getPage(pageNum);
                const viewport = page.getViewport({ scale });
                const outputScale = window.devicePixelRatio || 1.5;

                const context = canvas.getContext('2d');
                canvas.width = Math.floor(viewport.width * outputScale);
                canvas.height = Math.floor(viewport.height * outputScale);
                canvas.style.width = `${Math.floor(viewport.width)}px`;
                canvas.style.height = `${Math.floor(viewport.height)}px`;

                const transform = outputScale !== 1
                    ? [outputScale, 0, 0, outputScale, 0, 0]
                    : null;

                const renderContext = {
                    canvasContext: context,
                    transform: transform,
                    viewport: viewport,
                };

                const renderTask = page.render(renderContext);
                renderTasksRef.current.push(renderTask);
                await renderTask.promise;
            } catch (err) {
                if (err?.name !== 'RenderingCancelledException') {
                    console.error(`Error rendering page ${pageNum}:`, err);
                }
            }
        }
    }, [pdfDoc, scale, viewMode]);

    useEffect(() => {
        if (pdfDoc && viewMode === 'pdf') {
            renderPages();
        }
        return () => {
            cancelOngoingRenders();
        };
    }, [pdfDoc, scale, viewMode, renderPages]);

    if (!isOpen) return null;

    const onDownload = () => {
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'AKHI_RESUME_18-05.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Downloading Akhiyar Muhammed's Resume (AKHI_RESUME_18-05.pdf)...");
    };

    const onPrint = () => {
        if (viewMode === 'interactive') {
            window.print();
        } else {
            // Open in new window and trigger print
            const printWindow = window.open(resumeUrl, '_blank');
            if (printWindow) {
                printWindow.focus();
            } else {
                toast.info("Pop-up blocked. Opening direct PDF link.");
                window.open(resumeUrl, '_blank');
            }
        }
    };

    const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 2.4));
    const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.6));
    const handleResetZoom = () => setScale(1.15);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl h-[92vh] max-h-[950px] bg-[#121212] border border-[#2A2A2A] rounded-xl shadow-2xl flex flex-col overflow-hidden text-white transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#2A2A2A] bg-[#0E0E0E] gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-accent/10 border border-accent/30 text-accent">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-display text-base sm:text-lg font-semibold text-white leading-none">
                                    Akhiyar Muhammed — Resume
                                </h3>
                                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full">
                                    Official 2026
                                </span>
                            </div>
                            <p className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider mt-1 flex items-center gap-2">
                                <span>AKHI_RESUME_18-05.pdf</span>
                                <span>•</span>
                                <span>B.Tech Data Science</span>
                            </p>
                        </div>
                    </div>

                    {/* View Switcher & Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-[#1A1A1A] p-0.5 rounded border border-[#2E2E2E] text-xs font-mono">
                            <button
                                onClick={() => setViewMode('pdf')}
                                className={`px-2.5 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                                    viewMode === 'pdf'
                                        ? 'bg-accent text-white font-semibold shadow'
                                        : 'text-[#9CA3AF] hover:text-white'
                                }`}
                                title="View live rendered official PDF document"
                            >
                                <FileText className="w-3.5 h-3.5" />
                                <span className="hidden xs:inline">PDF Document</span>
                            </button>
                            <button
                                onClick={() => setViewMode('interactive')}
                                className={`px-2.5 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                                    viewMode === 'interactive'
                                        ? 'bg-accent text-white font-semibold shadow'
                                        : 'text-[#9CA3AF] hover:text-white'
                                }`}
                                title="View structured interactive resume"
                            >
                                <Layout className="w-3.5 h-3.5" />
                                <span className="hidden xs:inline">Interactive ATS</span>
                            </button>
                        </div>

                        {/* PDF Zoom Controls (When in PDF view) */}
                        {viewMode === 'pdf' && !isLoading && !loadError && (
                            <div className="hidden sm:flex items-center bg-[#1A1A1A] border border-[#2E2E2E] rounded text-[#9CA3AF]">
                                <button
                                    onClick={handleZoomOut}
                                    className="p-1.5 hover:text-white hover:bg-[#252525] rounded-l transition-colors"
                                    title="Zoom Out"
                                >
                                    <ZoomOut className="w-4 h-4" />
                                </button>
                                <span className="px-2 font-mono text-[11px] select-none text-[#D1D5DB]">
                                    {Math.round(scale * 100)}%
                                </span>
                                <button
                                    onClick={handleZoomIn}
                                    className="p-1.5 hover:text-white hover:bg-[#252525] rounded-r transition-colors"
                                    title="Zoom In"
                                >
                                    <ZoomIn className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleResetZoom}
                                    className="p-1.5 border-l border-[#2E2E2E] hover:text-white hover:bg-[#252525] transition-colors"
                                    title="Reset Zoom (Fit)"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}

                        {/* Print */}
                        <button
                            onClick={onPrint}
                            className="hidden md:inline-flex items-center gap-1.5 border border-[#2A2A2A] hover:border-accent text-[#9CA3AF] hover:text-white px-3 py-1.5 rounded-sm font-mono text-xs uppercase tracking-wider transition-colors bg-[#161616]"
                            title="Print Resume"
                        >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print</span>
                        </button>

                        {/* Download CTA */}
                        <button
                            onClick={onDownload}
                            className="inline-flex items-center gap-2 bg-accent hover:bg-[#FF8B33] text-white px-3.5 py-1.5 rounded-sm font-mono text-xs uppercase tracking-wider transition-colors shadow-lg font-medium cursor-pointer"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                        </button>

                        {/* External link */}
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 border border-[#2A2A2A] hover:border-accent text-[#9CA3AF] hover:text-white rounded-sm transition-colors"
                            title="Open direct file in new tab"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="p-1.5 border border-[#2A2A2A] hover:border-red-500/50 text-[#9CA3AF] hover:text-white hover:bg-red-500/10 rounded-sm transition-colors"
                            title="Close modal (Esc)"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Modal Body Container */}
                <div
                    ref={containerRef}
                    className="flex-1 overflow-y-auto overflow-x-auto bg-[#0a0a0a] relative custom-scrollbar select-text"
                >
                    {/* Mode 1: PDF Viewer */}
                    {viewMode === 'pdf' && (
                        <div className="min-h-full flex flex-col items-center justify-start p-4 sm:p-8">
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center my-auto py-24 text-center">
                                    <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
                                    <p className="font-mono text-sm text-white font-medium">
                                        Rendering High-Definition Resume...
                                    </p>
                                    <p className="font-mono text-xs text-[#6B7280] mt-1">
                                        Loading vector typography & layout from official PDF
                                    </p>
                                </div>
                            )}

                            {loadError && (
                                <div className="max-w-md my-auto py-12 px-6 text-center bg-[#141414] border border-[#2A2A2A] rounded-lg shadow-xl">
                                    <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                                    <h4 className="font-display text-lg font-semibold text-white">
                                        Direct PDF Stream Unavailable
                                    </h4>
                                    <p className="text-xs text-[#9CA3AF] mt-2 mb-6 leading-relaxed">
                                        Your browser or connection prefers direct document download or interactive rendering.
                                    </p>
                                    <div className="flex flex-col gap-2.5">
                                        <button
                                            onClick={() => setViewMode('interactive')}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-[#FF8B33] text-white py-2.5 rounded font-mono text-xs uppercase tracking-wider font-semibold shadow"
                                        >
                                            <Sparkles className="w-4 h-4" />
                                            View Interactive Digital Resume
                                        </button>
                                        <button
                                            onClick={onDownload}
                                            className="w-full inline-flex items-center justify-center gap-2 border border-[#333] hover:border-accent text-white py-2.5 rounded font-mono text-xs uppercase tracking-wider bg-[#1A1A1A]"
                                        >
                                            <Download className="w-4 h-4 text-accent" />
                                            Download Official PDF
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Rendered Canvas Pages */}
                            {!isLoading && !loadError && (
                                <div className="flex flex-col items-center gap-8 w-full">
                                    {Array.from({ length: numPages }, (_, index) => (
                                        <div
                                            key={`page-${index + 1}`}
                                            className="relative bg-white shadow-2xl rounded-sm border border-neutral-800 transition-transform duration-200 overflow-hidden"
                                            style={{
                                                boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.2)'
                                            }}
                                        >
                                            <canvas
                                                ref={(el) => (canvasRefs.current[index] = el)}
                                                className="block max-w-full"
                                            />
                                            {/* Page Indicator Tag */}
                                            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[9px] font-mono text-white/80 border border-white/10 select-none">
                                                Page {index + 1} of {numPages}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mode 2: Interactive ATS Digital Resume View */}
                    {viewMode === 'interactive' && (
                        <div className="max-w-4xl mx-auto p-4 sm:p-8 md:p-12 print:p-0">
                            <div className="bg-[#111111] border border-[#262626] rounded-xl p-6 sm:p-10 shadow-2xl space-y-8 text-neutral-200">
                                {/* ATS Header */}
                                <div className="border-b border-[#2A2A2A] pb-8">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                                                {PROFILE.name}
                                            </h1>
                                            <p className="font-mono text-accent text-sm sm:text-base font-semibold mt-1">
                                                Data Science Engineer &amp; Full Stack Developer
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <button
                                                onClick={onDownload}
                                                className="inline-flex items-center gap-1.5 bg-accent/15 border border-accent/40 text-accent hover:bg-accent hover:text-white px-3 py-1.5 rounded text-xs font-mono transition-colors"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                PDF Copy
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contact Strip */}
                                    <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#9CA3AF] font-mono">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-accent" />
                                            {PROFILE.location}
                                        </span>
                                        <a
                                            href={`mailto:${PROFILE.email}`}
                                            className="flex items-center gap-1.5 hover:text-white transition-colors"
                                        >
                                            <Mail className="w-3.5 h-3.5 text-accent" />
                                            {PROFILE.email}
                                        </a>
                                        <a
                                            href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                                            className="flex items-center gap-1.5 hover:text-white transition-colors"
                                        >
                                            <Phone className="w-3.5 h-3.5 text-accent" />
                                            {PROFILE.phone}
                                        </a>
                                        <a
                                            href="https://linkedin.com/in/akhiyar-muhammed"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 hover:text-white transition-colors"
                                        >
                                            <Linkedin className="w-3.5 h-3.5 text-accent" />
                                            linkedin.com/in/akhiyar-muhammed
                                        </a>
                                        <a
                                            href="https://github.com/akhiyaarmuhammed"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 hover:text-white transition-colors"
                                        >
                                            <Github className="w-3.5 h-3.5 text-accent" />
                                            github.com/akhiyaarmuhammed
                                        </a>
                                    </div>

                                    {/* Summary */}
                                    <p className="mt-5 text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                                        {PROFILE.summary}
                                    </p>
                                </div>

                                {/* Education */}
                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <GraduationCap className="w-4 h-4 text-accent" />
                                        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
                                            Education
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        {EDUCATION.map((edu, i) => (
                                            <div key={i} className="bg-[#161616] p-4 rounded border border-[#222]">
                                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                    <h3 className="font-display font-semibold text-white text-base">
                                                        {edu.degree}
                                                    </h3>
                                                    <span className="font-mono text-xs text-accent">
                                                        {edu.period}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-[#9CA3AF] mt-0.5">{edu.institution}</p>
                                                <p className="text-xs text-[#D1D5DB] mt-2 leading-relaxed">
                                                    {edu.detail}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Experience */}
                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Briefcase className="w-4 h-4 text-accent" />
                                        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
                                            Experience
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        {EXPERIENCE.map((exp, i) => (
                                            <div key={i} className="bg-[#161616] p-4 rounded border border-[#222]">
                                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                    <div>
                                                        <h3 className="font-display font-semibold text-white text-base">
                                                            {exp.role}
                                                        </h3>
                                                        <p className="text-xs text-accent font-mono">{exp.company}</p>
                                                    </div>
                                                    <span className="font-mono text-xs text-[#9CA3AF]">
                                                        {exp.period}
                                                    </span>
                                                </div>
                                                <ul className="mt-3 space-y-1.5 text-xs text-[#D1D5DB]">
                                                    {exp.bullets.map((bullet, bi) => (
                                                        <li key={bi} className="flex items-start gap-2">
                                                            <span className="text-accent mt-0.5">•</span>
                                                            <span>{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Technical Skills */}
                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Code2 className="w-4 h-4 text-accent" />
                                        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
                                            Technical Skills &amp; Domain Expertise
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {SKILL_GROUPS.map((group, i) => (
                                            <div key={i} className="bg-[#161616] p-4 rounded border border-[#222]">
                                                <h3 className="font-mono text-xs text-accent uppercase tracking-wider font-semibold mb-2.5">
                                                    {group.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {group.items.map((skill, si) => (
                                                        <span
                                                            key={si}
                                                            className="px-2 py-1 bg-[#202020] text-[#E5E7EB] text-[11px] rounded border border-[#2A2A2A]"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Key Projects */}
                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Sparkles className="w-4 h-4 text-accent" />
                                        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
                                            Featured Engineering Projects
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        {PROJECTS.map((proj) => (
                                            <div key={proj.id} className="bg-[#161616] p-4 rounded border border-[#222]">
                                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                    <h3 className="font-display font-semibold text-white text-base">
                                                        {proj.title}
                                                    </h3>
                                                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                                                        {proj.category}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-[#D1D5DB] mt-2 leading-relaxed">
                                                    {proj.blurb}
                                                </p>
                                                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                                                    {proj.stack.map((tech, ti) => (
                                                        <span
                                                            key={ti}
                                                            className="font-mono text-[10px] text-[#9CA3AF] bg-[#222] px-2 py-0.5 rounded"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Certifications */}
                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Award className="w-4 h-4 text-accent" />
                                        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
                                            Certifications &amp; Accreditations
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {CERTIFICATIONS.map((cert, i) => (
                                            <div key={i} className="bg-[#161616] p-3.5 rounded border border-[#222]">
                                                <h4 className="font-display text-sm font-semibold text-white">
                                                    {cert.title}
                                                </h4>
                                                <p className="text-xs text-accent font-mono mt-0.5">{cert.issuer}</p>
                                                <p className="text-[11px] text-[#9CA3AF] mt-1">{cert.skills}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Leadership & Community */}
                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Users className="w-4 h-4 text-accent" />
                                        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
                                            Leadership &amp; Community Engagement
                                        </h2>
                                    </div>
                                    <div className="space-y-3">
                                        {COMMUNITY.map((comm, i) => (
                                            <div key={i} className="bg-[#161616] p-3.5 rounded border border-[#222]">
                                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                    <h4 className="font-display text-sm font-semibold text-white">
                                                        {comm.role} · <span className="text-accent">{comm.org}</span>
                                                    </h4>
                                                    <span className="font-mono text-xs text-[#9CA3AF]">{comm.period}</span>
                                                </div>
                                                <p className="text-xs text-[#D1D5DB] mt-1.5">{comm.note}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Bar */}
                <div className="px-4 sm:px-6 py-2.5 border-t border-[#2A2A2A] bg-[#0E0E0E] flex flex-wrap items-center justify-between text-xs text-[#9CA3AF] gap-2 select-none">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11px] sm:text-xs">
                            Verified Candidate Profile · Ready for immediate review &amp; interview
                        </span>
                    </div>
                    <div className="font-mono text-[10px] text-[#6B7280] hidden sm:block">
                        Press ESC to dismiss · Click Download for PDF copy
                    </div>
                </div>
            </div>
        </div>
    );
}
