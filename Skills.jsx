import { useState } from "react";
import SectionHeader from "./SectionHeader.jsx";
import { SKILL_GROUPS } from "./portfolio.js";
import { Search, LayoutGrid, Layers, Check } from "lucide-react";

export default function Skills() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeView, setActiveView] = useState("categories"); // "categories" | "grid"
    const [selectedSkill, setSelectedSkill] = useState(null);

    const allSkillsList = SKILL_GROUPS.flatMap((g) => 
        g.items.map((it) => ({ name: it, group: g.title, tag: g.tag }))
    );

    const filteredSkills = searchTerm.trim() === ""
        ? allSkillsList
        : allSkillsList.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));

    return (
        <section id="skills" data-testid="skills-section" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#0C0C0C]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <SectionHeader
                        index="02"
                        kicker="Stack &amp; Capabilities"
                        title="A technical toolkit bridging data, code, and teams."
                        subtitle="From statistical modeling and high-throughput backend APIs to team orchestration and product strategy."
                    />

                    {/* Controls Toolbar: Search & View Switch */}
                    <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Filter skills (e.g. Python, React)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-[#141414] border border-[#262626] focus:border-accent text-white font-mono text-xs pl-8 pr-3 py-1.5 rounded-sm focus:outline-none w-56 transition-colors"
                            />
                        </div>

                        {/* View Mode Switcher */}
                        <div className="flex items-center bg-[#141414] p-1 border border-[#262626] rounded-sm">
                            <button
                                onClick={() => setActiveView("categories")}
                                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                                    activeView === "categories" ? "bg-accent text-white" : "text-[#9CA3AF] hover:text-white"
                                }`}
                                title="Categorized View"
                            >
                                <Layers className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setActiveView("grid")}
                                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                                    activeView === "grid" ? "bg-accent text-white" : "text-[#9CA3AF] hover:text-white"
                                }`}
                                title="Grid Cloud View"
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categorized View */}
                {activeView === "categories" && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {SKILL_GROUPS.map((g, idx) => {
                            const groupSkills = searchTerm.trim()
                                ? g.items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase().trim()))
                                : g.items;

                            if (groupSkills.length === 0) return null;

                            return (
                                <div
                                    key={g.title}
                                    data-testid={`skill-group-${idx}`}
                                    className={`group bg-[#121212] border border-[#2A2A2A] p-8 md:p-10 rounded-sm hover:border-accent transition-all duration-300 ${
                                        idx === 0 ? "md:col-span-7" : idx === 1 ? "md:col-span-5" : idx === 2 ? "md:col-span-5" : "md:col-span-7"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-display text-2xl md:text-3xl text-white font-bold">{g.title}</h3>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-semibold px-2 py-0.5 bg-accent/10 border border-accent/20 rounded">
                                            {g.tag}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {groupSkills.map((t) => {
                                            const isSelected = selectedSkill === t;
                                            return (
                                                <button
                                                    key={t}
                                                    onClick={() => setSelectedSkill(isSelected ? null : t)}
                                                    className={`font-mono text-xs px-3.5 py-2 border rounded-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                                                        isSelected
                                                            ? "bg-accent border-accent text-white shadow-md font-semibold"
                                                            : "bg-[#181818] border-[#2A2A2A] text-[#F3F4F6] hover:border-accent hover:text-accent"
                                                    }`}
                                                >
                                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                                    <span>{t}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Cloud Grid View */}
                {activeView === "grid" && (
                    <div className="bg-[#121212] border border-[#2A2A2A] p-8 md:p-12 rounded-sm">
                        <div className="flex flex-wrap gap-3">
                            {filteredSkills.map((s) => {
                                const isSelected = selectedSkill === s.name;
                                return (
                                    <button
                                        key={s.name}
                                        onClick={() => setSelectedSkill(isSelected ? null : s.name)}
                                        className={`font-mono text-sm px-4 py-2.5 border rounded-sm transition-all cursor-pointer flex items-center gap-2 ${
                                            isSelected
                                                ? "bg-accent border-accent text-white shadow-lg font-semibold"
                                                : "bg-[#181818] border-[#2A2A2A] text-[#E5E7EB] hover:border-accent hover:text-accent"
                                        }`}
                                    >
                                        <span>{s.name}</span>
                                        <span className="text-[9px] uppercase tracking-widest text-[#888] bg-black/40 px-1.5 py-0.5 rounded">
                                            {s.group.split(" ")[0]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Active Skill Info Footer */}
                {selectedSkill && (
                    <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-sm flex items-center justify-between text-xs text-white">
                        <div>
                            <span className="font-mono uppercase text-accent font-semibold">Active Selection:</span>{" "}
                            <span className="font-bold">{selectedSkill}</span> — utilized in core projects and production workloads.
                        </div>
                        <button 
                            onClick={() => setSelectedSkill(null)}
                            className="font-mono text-[10px] text-accent hover:underline uppercase tracking-wider cursor-pointer"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
