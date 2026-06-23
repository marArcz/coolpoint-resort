import { useEffect, useRef } from "react";

const CustomerCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const supportsCursor = window.matchMedia("(hover: hover) and (pointer: fine)");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (!supportsCursor.matches || prefersReducedMotion.matches) {
            return;
        }

        const dot = dotRef.current;
        const outline = outlineRef.current;

        if (!dot || !outline) {
            return;
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;
        let isVisible = false;
        let rafId = 0;

        const updateVisibility = (visible: boolean) => {
            if (visible === isVisible) {
                return;
            }

            isVisible = visible;
            dot.style.opacity = visible ? "1" : "0";
            outline.style.opacity = visible ? "1" : "0";
        };

        const setInteractiveState = (interactive: boolean) => {
            outline.style.width = interactive ? "3.5rem" : "2.75rem";
            outline.style.height = interactive ? "3.5rem" : "2.75rem";
            outline.style.borderColor = interactive
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.55)";
            outline.style.background = interactive
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.02)";
            dot.style.transform = interactive
                ? `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1.35)`
                : `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
        };

        const animate = () => {
            outlineX += (mouseX - outlineX) * 0.16;
            outlineY += (mouseY - outlineY) * 0.16;

            outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            rafId = window.requestAnimationFrame(animate);
        };

        const handleMove = (event: MouseEvent) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
            updateVisibility(true);
        };

        const handleMouseLeave = () => {
            updateVisibility(false);
        };

        const handleMouseEnter = () => {
            updateVisibility(true);
        };

        const handleHoverChange = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const isInteractive = Boolean(
                target?.closest(
                    'a, button, input, textarea, select, summary, [role="button"], [data-cursor="interactive"]',
                ),
            );

            setInteractiveState(isInteractive);
        };

        dot.style.opacity = "0";
        outline.style.opacity = "0";
        rafId = window.requestAnimationFrame(animate);

        window.addEventListener("mousemove", handleMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseover", handleHoverChange);

        return () => {
            window.cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseover", handleHoverChange);
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-2.5 w-2.5 rounded-full bg-white mix-blend-difference transition-[opacity,transform] duration-200 md:block"
            />
            <div
                ref={outlineRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9997] hidden h-11 w-11 rounded-full border border-white/55 bg-white/[0.02] mix-blend-difference transition-[opacity,width,height,border-color,background-color] duration-300 md:block"
            />
        </>
    );
};

export default CustomerCursor;
