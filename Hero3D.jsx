import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { sound } from "./audio.js";
import { Sparkles, Cpu, Layers, Box, Orbit as OrbitIcon } from "lucide-react";

// Interactive shockwave particle explosion effect
function ShockwaveEffect({ active, position = [0, 0, 0], theme = "orange" }) {
    const meshRef = useRef();
    const [scale, setScale] = useState(0.1);
    const [opacity, setOpacity] = useState(0);

    const colorMap = {
        orange: "#FF6B00",
        cyan: "#00E5FF",
        emerald: "#10B981",
        violet: "#A855F7",
    };

    useFrame((state, delta) => {
        if (active) {
            meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 4.5, delta * 12));
            meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, 0, delta * 8);
        } else {
            if (meshRef.current) {
                meshRef.current.scale.setScalar(0.1);
                meshRef.current.material.opacity = 0.8;
            }
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
                color={colorMap[theme] || "#FF6B00"}
                transparent
                wireframe
                opacity={0.8}
            />
        </mesh>
    );
}

// Mode 1: Neural Core
function NeuralCore({ theme = "orange", onClick }) {
    const coreRef = useRef();
    const ring1Ref = useRef();
    const ring2Ref = useRef();

    const color = theme === "cyan" ? "#00E5FF" : theme === "emerald" ? "#10B981" : theme === "violet" ? "#A855F7" : "#FF6B00";

    useFrame((state, delta) => {
        if (coreRef.current) {
            coreRef.current.rotation.y += delta * 0.4;
            coreRef.current.rotation.x += delta * 0.2;
        }
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z += delta * 0.6;
            ring1Ref.current.rotation.x += delta * 0.3;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.y -= delta * 0.5;
            ring2Ref.current.rotation.z -= delta * 0.4;
        }
    });

    return (
        <group onClick={onClick} className="cursor-pointer">
            {/* Outer wireframe icosahedron */}
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[2.2, 1]} />
                <meshStandardMaterial
                    wireframe
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.6}
                    roughness={0.2}
                />
            </mesh>

            {/* Inner Distorted Sphere */}
            <Sphere args={[1.2, 64, 64]}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.1}
                    metalness={0.8}
                />
            </Sphere>

            {/* Energy Ring 1 */}
            <mesh ref={ring1Ref}>
                <torusGeometry args={[3.0, 0.04, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.7} />
            </mesh>

            {/* Energy Ring 2 */}
            <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[3.5, 0.03, 16, 100]} />
                <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

// Mode 2: Quantum Matrix (Cube Lattice)
function QuantumMatrix({ theme = "orange", onClick }) {
    const groupRef = useRef();
    const color = theme === "cyan" ? "#00E5FF" : theme === "emerald" ? "#10B981" : theme === "violet" ? "#A855F7" : "#FF6B00";

    const cubes = useMemo(() => {
        const items = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    items.push([x * 1.4, y * 1.4, z * 1.4]);
                }
            }
        }
        return items;
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3;
            groupRef.current.rotation.x += delta * 0.2;
        }
    });

    return (
        <group ref={groupRef} onClick={onClick}>
            {cubes.map((pos, idx) => (
                <mesh key={idx} position={pos}>
                    <boxGeometry args={[0.55, 0.55, 0.55]} />
                    <meshStandardMaterial
                        color={color}
                        wireframe={idx % 2 === 0}
                        emissive={color}
                        emissiveIntensity={idx % 3 === 0 ? 0.8 : 0.2}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Mode 3: Holo Torus Knot
function HoloTorus({ theme = "orange", onClick }) {
    const meshRef = useRef();
    const color = theme === "cyan" ? "#00E5FF" : theme === "emerald" ? "#10B981" : theme === "violet" ? "#A855F7" : "#FF6B00";

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.4;
            meshRef.current.rotation.y += delta * 0.6;
        }
    });

    return (
        <mesh ref={meshRef} onClick={onClick}>
            <torusKnotGeometry args={[1.8, 0.55, 128, 32]} />
            <meshStandardMaterial
                color={color}
                wireframe
                emissive={color}
                emissiveIntensity={0.7}
                metalness={0.8}
                roughness={0.2}
            />
        </mesh>
    );
}

// Mode 4: Tech Sphere with Floating Badge Orbit
function TechSphere({ theme = "orange", onClick }) {
    const groupRef = useRef();
    const color = theme === "cyan" ? "#00E5FF" : theme === "emerald" ? "#10B981" : theme === "violet" ? "#A855F7" : "#FF6B00";

    const skills = [
        { name: "Python", pos: [2.8, 0, 0] },
        { name: "Data Science", pos: [-2.8, 0, 0] },
        { name: "React 18", pos: [0, 2.8, 0] },
        { name: "Machine Learning", pos: [0, -2.8, 0] },
        { name: "Node.js", pos: [0, 0, 2.8] },
        { name: "SQL", pos: [0, 0, -2.8] },
    ];

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.35;
        }
    });

    return (
        <group ref={groupRef} onClick={onClick}>
            <mesh>
                <dodecahedronGeometry args={[1.6, 0]} />
                <meshStandardMaterial
                    color={color}
                    wireframe
                    emissive={color}
                    emissiveIntensity={0.5}
                />
            </mesh>

            {skills.map((s, idx) => (
                <group key={idx} position={s.pos}>
                    <Html center distanceFactor={10}>
                        <div className="bg-[#121212]/90 backdrop-blur-md border border-accent/60 text-white font-mono text-[10px] uppercase px-2.5 py-1 rounded shadow-lg whitespace-nowrap select-none flex items-center gap-1.5 hover:scale-110 transition-transform">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                            <span>{s.name}</span>
                        </div>
                    </Html>
                </group>
            ))}
        </group>
    );
}

export default function Hero3D({ theme = "orange" }) {
    const [mode, setMode] = useState("core"); // "core" | "matrix" | "torus" | "tech"
    const [shockwave, setShockwave] = useState(false);

    const handleObjectClick = () => {
        sound.playShockwave();
        setShockwave(true);
        setTimeout(() => setShockwave(false), 500);
    };

    const handleModeChange = (newMode) => {
        sound.playModeShift();
        setMode(newMode);
    };

    return (
        <div className="relative w-full h-[400px] md:h-[520px] rounded-xl bg-[#0F0F11]/60 border border-[#262626] backdrop-blur-md overflow-hidden group hover:border-accent/50 transition-colors shadow-2xl">
            {/* Ambient overlay glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 0, 7.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <pointLight position={[-10, -10, -5]} intensity={1} color={theme === "cyan" ? "#00E5FF" : "#FF6B00"} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
                    {mode === "core" && <NeuralCore theme={theme} onClick={handleObjectClick} />}
                    {mode === "matrix" && <QuantumMatrix theme={theme} onClick={handleObjectClick} />}
                    {mode === "torus" && <HoloTorus theme={theme} onClick={handleObjectClick} />}
                    {mode === "tech" && <TechSphere theme={theme} onClick={handleObjectClick} />}
                    <ShockwaveEffect active={shockwave} theme={theme} />
                </Float>

                <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
            </Canvas>

            {/* Header Live 3D Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#18181B]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#3F3F46]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4D4D8] font-semibold">
                    Interactive 3D Stage
                </span>
                <span className="text-[9px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                    Drag to Rotate
                </span>
            </div>

            {/* Mode Selector Buttons Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between flex-wrap gap-2 bg-[#121215]/85 backdrop-blur-md p-2 rounded-lg border border-[#27272A]">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => handleModeChange("core")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                            mode === "core"
                                ? "bg-accent text-white shadow font-semibold"
                                : "text-[#A1A1AA] hover:text-white hover:bg-[#1E1E24]"
                        }`}
                        title="Neural Core"
                    >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Neural</span>
                    </button>

                    <button
                        onClick={() => handleModeChange("matrix")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                            mode === "matrix"
                                ? "bg-accent text-white shadow font-semibold"
                                : "text-[#A1A1AA] hover:text-white hover:bg-[#1E1E24]"
                        }`}
                        title="Quantum Matrix"
                    >
                        <Box className="w-3.5 h-3.5" />
                        <span>Matrix</span>
                    </button>

                    <button
                        onClick={() => handleModeChange("torus")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                            mode === "torus"
                                ? "bg-accent text-white shadow font-semibold"
                                : "text-[#A1A1AA] hover:text-white hover:bg-[#1E1E24]"
                        }`}
                        title="Holo Torus"
                    >
                        <OrbitIcon className="w-3.5 h-3.5" />
                        <span>Torus</span>
                    </button>

                    <button
                        onClick={() => handleModeChange("tech")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                            mode === "tech"
                                ? "bg-accent text-white shadow font-semibold"
                                : "text-[#A1A1AA] hover:text-white hover:bg-[#1E1E24]"
                        }`}
                        title="Tech Orbit"
                    >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Orbit</span>
                    </button>
                </div>

                <div className="font-mono text-[10px] text-[#A1A1AA] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span>Click model for pulse</span>
                </div>
            </div>
        </div>
    );
}
