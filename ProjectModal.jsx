import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Sparkles } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
    if (!isOpen || !project) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-3xl max-h-[90vh] bg-[#121212] border border-[#2A2A2A] rounded-lg shadow-2xl flex flex-col overflow-hidden text-white"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Header with Badge */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden bg-black">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                    
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 border border-white/10 rounded-full text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-1 bg-accent text-white font-mono text-[10px] uppercase tracking-widest font-semibold rounded-sm">
                                {project.category}
                            </span>
                        </div>
                        <h2 className="font-display text-2xl md:text-4xl text-white font-bold tracking-tight">
                            {project.title}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-[#9CA3AF] mb-2 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-accent" />
                            Overview
                        </h4>
                        <p className="text-[#D1D5DB] text-base leading-relaxed">
                            {project.fullDescription || project.blurb}
                        </p>
                    </div>

                    {/* Key Highlights */}
                    {project.highlights && (
                        <div>
                            <h4 className="font-mono text-xs uppercase tracking-widest text-[#9CA3AF] mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-accent" />
                                Key Capabilities & Features
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {project.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-2.5 bg-[#181818] border border-[#262626] p-3 rounded-sm text-sm text-[#E5E7EB]">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tech Stack */}
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-[#9CA3AF] mb-3 flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-accent" />
                            Technologies & Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((s) => (
                                <span 
                                    key={s}
                                    className="font-mono text-xs px-3 py-1.5 bg-[#1C1C1C] border border-[#333333] text-[#F3F4F6] rounded-sm hover:border-accent transition-colors"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 md:px-8 py-4 border-t border-[#2A2A2A] bg-[#0E0E0E] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#222222] hover:bg-[#2A2A2A] border border-[#333333] text-white rounded-sm font-mono text-xs uppercase tracking-wider transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                Source Code
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-[#FF8B33] text-white rounded-sm font-mono text-xs uppercase tracking-wider transition-colors shadow-lg"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo / Preview
                            </a>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="font-mono text-xs text-[#9CA3AF] hover:text-white px-3 py-2 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
