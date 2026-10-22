"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

/** Cropped banner that pops out to a centered, uncropped lightbox on click. */
export function BannerImage({ src, alt, className, imageClassName, priority }: BannerImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand image: ${alt}`}
        className={cn("group relative block w-full cursor-zoom-in overflow-hidden", className)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn(
            "object-cover transition-all duration-500 group-hover:scale-[1.03]",
            imageClassName
          )}
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100 group-focus-visible:bg-black/40 group-focus-visible:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-[10px] uppercase tracking-[0.2rem] text-foreground">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
            Click to expand
          </span>
        </span>
      </button>

      {open &&
        createPortal(
          <dialog
            open
            aria-label={alt}
            className="fixed inset-0 z-[100] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center bg-black/85 p-4 text-foreground backdrop-blur-sm sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close image"
              className="absolute inset-0 cursor-zoom-out"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close image"
              className="absolute right-4 top-4 z-10 rounded-full bg-background/90 p-2 text-foreground transition-transform hover:scale-110"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="pointer-events-none relative h-[85vh] w-full max-w-5xl">
              <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
            </div>
          </dialog>,
          document.body
        )}
    </>
  );
}
