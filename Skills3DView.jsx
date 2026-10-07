import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { sound } from "./audio.js";

function SkillNode({ name, group, pos, isSelected, onSelect }) {
    const groupColor = group.includes("Data")
        ? "border-emerald-500/80 text-emerald-400 bg-emerald-950/40"
        : group.includes("Full-Stack") || group.includes("Development")
        ? "border-amber-500/80 text-amber-400 bg-amber-950/40"
        : group.includes("AI") || group.includes("Machine")
        ? "border-cyan-500/80 text-cyan-400 bg-cyan-950/40"
        : "border-purple-500/80 text-purple-400 bg-purple-950/40";

    return (
        <group position={pos}>
            {/* Small glowing 3D particle at node anchor */}
            <mesh>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={isSelected ? "#FF6B00" : "#FFFFFF"} />
            </mesh>

            {/* Floating HTML Badge */}
            <Html center distanceFactor={12}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        onSelect(name);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`px-3 py-1.5 rounded-md border font-mono text-xs shadow-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap select-none ${
                        isSelected
                            ? "bg-accent border-accent text-white scale-125 shadow-accent/50 font-bold z-50"
                            : `${groupColor} hover:scale-110 hover:border-white`
                    }`}
                >
                    <span>{name}</span>
                </button>
            </Html>
        </group>
    );
}

function SphereCloud({ skills, selectedSkill, onSelectSkill }) {
    const cloudRef = useRef();

    // Map skills onto spherical coordinates
    const nodes = useMemo(() => {
        const count = skills.length;
        const radius = 6.5;
        const temp = [];

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            temp.push({
                ...skills[i],
                pos: [x, y, z],
            });
        }
        return temp;
    }, [skills]);

    useFrame((state, delta) => {
        if (cloudRef.current) {
            cloudRef.current.rotation.y += delta * 0.12;
            cloudRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <group ref={cloudRef}>
            {nodes.map((n) => (
                <SkillNode
                    key={n.name}
                    name={n.name}
                    group={n.group}
                    pos={n.pos}
                    isSelected={selectedSkill === n.name}
                    onSelect={onSelectSkill}
                />
            ))}
        </group>
    );
}

export default function Skills3DView({ skills, selectedSkill, onSelectSkill }) {
    return (
        <div className="relative w-full h-[500px] md:h-[600px] bg-[#0E0E10] border border-[#2A2A2A] rounded-lg overflow-hidden shadow-2xl">
            <div className="absolute top-4 left-4 z-10 font-mono text-xs uppercase tracking-widest text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded">
                3D Interactive Skill Sphere — Drag to Rotate
            </div>

            <Canvas
                camera={{ position: [0, 0, 14], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.8} />
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <SphereCloud
                        skills={skills}
                        selectedSkill={selectedSkill}
                        onSelectSkill={onSelectSkill}
                    />
                </Float>
                <OrbitControls enableZoom={false} rotateSpeed={0.8} />
            </Canvas>
        </div>
    );
}
