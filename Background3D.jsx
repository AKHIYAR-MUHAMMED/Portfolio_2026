import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Color presets map
const COLOR_PRESETS = {
    orange: { primary: "#FF6B00", secondary: "#FFB800", particle: "#FFAA44" },
    cyan: { primary: "#00E5FF", secondary: "#0088FF", particle: "#70F0FF" },
    emerald: { primary: "#10B981", secondary: "#059669", particle: "#34D399" },
    violet: { primary: "#A855F7", secondary: "#6366F1", particle: "#C084FC" },
};

function FloatingParticles({ theme = "orange", density = "high" }) {
    const pointsRef = useRef();
    const count = density === "high" ? 1200 : density === "medium" ? 600 : 300;

    const colors = COLOR_PRESETS[theme] || COLOR_PRESETS.orange;

    const [positions, colorsArray] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const colorObj = new THREE.Color(colors.particle);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 35;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

            // Add slight color variation
            const randomRatio = 0.8 + Math.random() * 0.4;
            col[i * 3] = colorObj.r * randomRatio;
            col[i * 3 + 1] = colorObj.g * randomRatio;
            col[i * 3 + 2] = colorObj.b * randomRatio;
        }
        return [pos, col];
    }, [count, colors.particle]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.03;
            pointsRef.current.rotation.x += delta * 0.015;

            // Subtle mouse interaction
            const mouseX = (state.mouse.x * 2);
            const mouseY = (state.mouse.y * 2);

            pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouseX * 0.8, 0.05);
            pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouseY * 0.8, 0.05);
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colorsArray.length / 3}
                    array={colorsArray}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.07}
                vertexColors
                transparent
                opacity={0.65}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

function FloatingWireframes({ theme = "orange" }) {
    const groupRef = useRef();
    const colors = COLOR_PRESETS[theme] || COLOR_PRESETS.orange;

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
            groupRef.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Background 3D Octahedron 1 */}
            <mesh position={[-10, 6, -8]} rotation={[0.4, 0.2, 0]}>
                <octahedronGeometry args={[2.5, 0]} />
                <meshBasicMaterial wireframe color={colors.primary} transparent opacity={0.12} />
            </mesh>

            {/* Background 3D Icosahedron 2 */}
            <mesh position={[12, -7, -10]} rotation={[0.2, 0.8, 0.5]}>
                <icosahedronGeometry args={[3.2, 0]} />
                <meshBasicMaterial wireframe color={colors.secondary} transparent opacity={0.10} />
            </mesh>

            {/* Background Torus Knot */}
            <mesh position={[0, -12, -15]} rotation={[1, 0.5, 0]}>
                <torusKnotGeometry args={[3.5, 0.6, 64, 8]} />
                <meshBasicMaterial wireframe color={colors.primary} transparent opacity={0.07} />
            </mesh>
        </group>
    );
}

function GridPlane({ theme = "orange" }) {
    const gridRef = useRef();
    const colors = COLOR_PRESETS[theme] || COLOR_PRESETS.orange;

    useFrame((state, delta) => {
        if (gridRef.current) {
            gridRef.current.position.z = (gridRef.current.position.z + delta * 0.8) % 2;
        }
    });

    return (
        <group position={[0, -10, 0]} rotation={[-Math.PI / 2.3, 0, 0]}>
            <gridHelper
                ref={gridRef}
                args={[60, 40, colors.primary, "#1A1A1A"]}
                position={[0, 0, 0]}
            />
        </group>
    );
}

export default function Background3D({ theme = "orange", density = "high", active = true }) {
    if (!active) return null;

    return (
        <div 
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80 transition-opacity duration-700"
            aria-hidden
        >
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.3} />
                <FloatingParticles theme={theme} density={density} />
                <FloatingWireframes theme={theme} />
                <GridPlane theme={theme} />
            </Canvas>
        </div>
    );
}
