import React, { useEffect, useState } from "react";

export default function Cursor3D({ theme = "orange" }) {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [follower, setFollower] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);

    const themeColors = {
        orange: "#FF6B00",
        cyan: "#00E5FF",
        emerald: "#10B981",
        violet: "#A855F7",
    };

    const color = themeColors[theme] || "#FF6B00";

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.closest("button, a, [role='button'], input, .cursor-pointer")) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // Smooth follower lerp loop
    useEffect(() => {
        let animationFrameId;

        const render = () => {
            setFollower((prev) => ({
                x: prev.x + (pos.x - prev.x) * 0.18,
                y: prev.y + (pos.y - prev.y) * 0.18,
            }));
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [pos]);

    // Disable custom cursor on mobile/touch screens
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
            {/* Center dot */}
            <div
                className="fixed w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
                style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}`,
                }}
            />

            {/* Smooth 3D Ring Follower */}
            <div
                className="fixed rounded-full border border-opacity-60 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                style={{
                    left: `${follower.x}px`,
                    top: `${follower.y}px`,
                    borderColor: color,
                    width: isHovered ? "48px" : "28px",
                    height: isHovered ? "48px" : "28px",
                    backgroundColor: isHovered ? `${color}15` : "transparent",
                    boxShadow: isHovered ? `0 0 20px ${color}40` : "none",
                }}
            />
        </div>
    );
}
