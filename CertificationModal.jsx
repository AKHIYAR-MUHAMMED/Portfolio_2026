import React from 'react';
import { X, Award, CheckCircle2, Calendar, ShieldCheck, Tag } from 'lucide-react';

export default function CertificationModal({ cert, isOpen, onClose }) {
    if (!isOpen || !cert) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-xl bg-[#121212] border border-[#2A2A2A] rounded-lg shadow-2xl flex flex-col overflow-hidden text-white"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A] bg-[#0E0E0E]">
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent" />
                        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                            Credential Details
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-[#9CA3AF] hover:text-white border border-[#2A2A2A] hover:border-red-500/50 rounded transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6">
                    <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] flex items-center gap-1.5 mb-2">
                            <Calendar className="w-3.5 h-3.5" />
                            Issued {cert.date || "Verified"}
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl text-white font-bold tracking-tight">
                            {cert.title}
                        </h2>
                        <p className="font-mono text-sm text-accent mt-1">
                            {cert.issuer}
                        </p>
                    </div>

                    <div className="bg-[#181818] border border-[#262626] p-4 rounded-sm">
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#9CA3AF] mb-2 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Verification & Overview
                        </h4>
                        <p className="text-sm text-[#D1D5DB] leading-relaxed">
                            {cert.details || "Official academic/industry certification validating practical technical competencies."}
                        </p>
                        {cert.credentialId && (
                            <div className="mt-3 pt-3 border-t border-[#262626] flex items-center justify-between font-mono text-xs text-[#9CA3AF]">
                                <span>Credential Reference:</span>
                                <span className="text-white bg-black/40 px-2 py-0.5 rounded border border-[#333]">
                                    {cert.credentialId}
                                </span>
                            </div>
                        )}
                    </div>

                    {cert.skills && (
                        <div>
                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#9CA3AF] mb-2 flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5 text-accent" />
                                Skills Evaluated
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {cert.skills.split(',').map((s) => (
                                    <span 
                                        key={s}
                                        className="font-mono text-xs px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[#E5E7EB] rounded-sm"
                                    >
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#2A2A2A] bg-[#0E0E0E] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verified Credential</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-accent hover:bg-[#FF8B33] text-white px-5 py-2 rounded-sm font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
