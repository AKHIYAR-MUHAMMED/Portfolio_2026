import React, { useState, useRef } from "react";

/**
 * TiltCard Component
 * Provides 3D tilt effect with specular glare and depth transform on hover.
 */
export default function TiltCard({
    children,
    className = "",
    maxTilt = 12,
    glare = true,
    scale = 1.02,
    perspective = 1000,
    ...props
}) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate cursor position relative to center of card (-1 to +1)
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        // Rotate X is driven by Y movement (tilt down when cursor moves down)
        // Rotate Y is driven by X movement (tilt right when cursor moves right)
        const tiltX = -yPct * maxTilt * 2;
        const tiltY = xPct * maxTilt * 2;

        setTilt({
            x: tiltX,
            y: tiltY,
            glareX: (mouseX / width) * 100,
            glareY: (mouseY / height) * 100,
            isHovered: true,
        });
    };

    const handleMouseEnter = () => {
        setTilt((prev) => ({ ...prev, isHovered: true }));
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: `${perspective}px`,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-transform duration-200 ease-out ${className}`}
            {...props}
        >
            <div
                style={{
                    transform: tilt.isHovered
                        ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
                        : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                    transition: tilt.isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative"
            >
                {children}

                {/* Glare specular effect */}
                {glare && (
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-inherit overflow-hidden transition-opacity duration-300"
                        style={{
                            opacity: tilt.isHovered ? 0.15 : 0,
                            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)`,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
