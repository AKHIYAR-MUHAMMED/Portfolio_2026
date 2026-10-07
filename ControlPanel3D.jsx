import React, { useState } from "react";
import { Volume2, VolumeX, Sparkles, Palette, Eye, Settings2, Check } from "lucide-react";
import { sound } from "./audio.js";

const THEMES = [
    { id: "orange", name: "Amber Flame", color: "#FF6B00" },
    { id: "cyan", name: "Cyber Cyan", color: "#00E5FF" },
    { id: "emerald", name: "Emerald Pulse", color: "#10B981" },
    { id: "violet", name: "Neon Violet", color: "#A855F7" },
];

export default function ControlPanel3D({
    activeTheme,
    onThemeChange,
    bgActive,
    onToggleBg,
    soundActive,
    onToggleSound
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
            {/* Popover Settings Card */}
            {open && (
                <div className="bg-[#121215]/95 backdrop-blur-xl border border-[#33333B] p-5 rounded-2xl shadow-2xl w-72 text-white fade-up space-y-4">
                    <div className="flex items-center justify-between border-b border-[#24242A] pb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider">3D Engine Controls</span>
                        </div>
                        <span className="font-mono text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase">
                            60 FPS
                        </span>
                    </div>

                    {/* Color Presets */}
                    <div>
                        <label className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                            <Palette className="w-3 h-3" />
                            <span>3D Color Theme</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {THEMES.map((t) => {
                                const isActive = activeTheme === t.id;
                                return (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            sound.playClick();
                                            onThemeChange(t.id);
                                        }}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs border transition-all cursor-pointer ${
                                            isActive
                                                ? "border-accent bg-accent/15 text-white font-bold"
                                                : "border-[#27272A] bg-[#19191E] text-[#A1A1AA] hover:border-white/40 hover:text-white"
                                        }`}
                                    >
                                        <span
                                            className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                                            style={{ backgroundColor: t.color }}
                                        />
                                        <span className="truncate">{t.name.split(" ")[0]}</span>
                                        {isActive && <Check className="w-3 h-3 ml-auto text-accent" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Background WebGL toggle */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#24242A]">
                        <span className="font-mono text-xs text-[#D4D4D8] flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5 text-accent" />
                            <span>3D Background</span>
                        </span>
                        <button
                            onClick={() => {
                                sound.playClick();
                                onToggleBg();
                            }}
                            className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                                bgActive ? "bg-accent text-white font-bold" : "bg-[#24242A] text-[#888]"
                            }`}
                        >
                            {bgActive ? "ON" : "OFF"}
                        </button>
                    </div>

                    {/* Sound FX toggle */}
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#D4D4D8] flex items-center gap-2">
                            {soundActive ? <Volume2 className="w-3.5 h-3.5 text-accent" /> : <VolumeX className="w-3.5 h-3.5 text-[#888]" />}
                            <span>Audio FX</span>
                        </span>
                        <button
                            onClick={() => {
                                const nowActive = onToggleSound();
                                if (nowActive) sound.playClick();
                            }}
                            className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                                soundActive ? "bg-accent text-white font-bold" : "bg-[#24242A] text-[#888]"
                            }`}
                        >
                            {soundActive ? "ON" : "MUTED"}
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Trigger Button */}
            <button
                onClick={() => {
                    sound.playClick();
                    setOpen(!open);
                }}
                className="group relative bg-[#18181C]/90 hover:bg-accent text-white border border-[#373740] hover:border-accent p-3.5 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 cursor-pointer flex items-center justify-center"
                title="Toggle 3D Control Panel"
            >
                <Settings2 className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300 text-accent group-hover:text-white" />
                
                {/* Ping indicator */}
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full animate-ping opacity-75" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-black" />
            </button>
        </div>
    );
}
