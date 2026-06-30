import React from "react";

export default function SectionHeader({ index, kicker, title, subtitle }) {
    return (
        <div className="mb-16 md:mb-20 slide-in">
            <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-accent font-semibold">{index}</span>
                <span className="w-8 h-px bg-accent" style={{ opacity: 0.6 }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                    {kicker}
                </span>
            </div>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-primary tracking-tight max-w-3xl leading-[1.1]">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 font-body text-base md:text-lg text-secondary leading-relaxed max-w-2xl">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
