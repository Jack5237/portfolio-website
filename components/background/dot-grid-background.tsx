"use client";

import { DotGrid } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

/**
 * Renders a subtle dot grid background pattern using WebGL shaders.
 * @returns The background component.
 */
export const DotGridBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 1280, height: 720 });

  useEffect(() => {
    // Set dimensions based on viewport
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <DotGrid
        width={dimensions.width}
        height={dimensions.height}
        colorBack="#050505"
        colorFill="#0a0a0a"
        colorStroke="#ffffff"
        size={1}
        gapX={22}
        gapY={27}
        strokeWidth={0}
        sizeRange={1}
        opacityRange={0.3}
        shape="circle"
      />
    </div>
  );
};

