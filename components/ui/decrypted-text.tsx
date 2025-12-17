"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DecryptedTextProps {
  /**
   * The target text that will be revealed through the decrypt animation.
   */
  readonly text: string;
  /**
   * Animation speed in milliseconds between character swaps.
   */
  readonly speed?: number;
  /**
   * Maximum number of iterations before revealing the final text.
   */
  readonly maxIterations?: number;
  /**
   * Custom character set to use during the encryption phase.
   */
  readonly characters?: string;
  /**
   * CSS class applied to the container element.
   */
  readonly className?: string;
  /**
   * CSS class applied to the parent wrapper.
   */
  readonly parentClassName?: string;
  /**
   * CSS class applied when the text is in the encrypted state.
   */
  readonly encryptedClassName?: string;
  /**
   * Trigger for animation: 'hover' starts on mouse enter, 'view' starts when element enters viewport.
   */
  readonly animateOn?: "hover" | "view";
  /**
   * Direction of reveal animation: 'left' | 'right' | 'center'.
   */
  readonly revealDirection?: "left" | "right" | "center";
}

/**
 * Renders text with a decryption animation effect that cycles through random characters before revealing the final text.
 * @param props - Configuration for the decrypt animation behavior.
 * @returns A React element displaying the animated text.
 */
export const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 15,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()",
  className,
  parentClassName,
  encryptedClassName,
  animateOn = "hover",
  revealDirection = "center"
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(animateOn === "view");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const viewIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);

  /**
   * Generates a random character from the provided character set.
   */
  const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];

  /**
   * Starts the decryption animation sequence.
   */
  const startAnimation = () => {
    if (isAnimating || isRevealed) return;

    setIsAnimating(true);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      const newText = text
        .split("")
        .map((_, index) => {
          // Reveal direction logic
          if (revealDirection === "left") {
            if (index <= iteration) return text[index];
          } else if (revealDirection === "right") {
            if (text.length - 1 - index <= iteration) return text[text.length - 1 - index];
          } else {
            // center - reveal from both ends
            const center = Math.floor(text.length / 2);
            const distanceFromCenter = Math.abs(index - center);
            if (distanceFromCenter <= iteration / 2) return text[index];
          }

          // Show random character during animation
          if (iteration < maxIterations) {
            return getRandomChar();
          }
          return text[index];
        })
        .join("");

      setDisplayText(newText);
      iteration += 1;

      if (iteration >= maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(text);
        setIsRevealed(true);
        setIsAnimating(false);
      }
    }, speed);
  };

  /**
   * Cleans up the animation intervals on unmount or when animation stops.
   */
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (viewIntervalRef.current) {
        clearInterval(viewIntervalRef.current);
      }
    };
  }, []);

  /**
   * Sets up intersection observer for 'view' trigger mode.
   */
  useEffect(() => {
    if (animateOn === "view" && !isRevealed && elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isRevealed && !isAnimating) {
              setIsAnimating(true);
              let iteration = 0;

              if (viewIntervalRef.current) {
                clearInterval(viewIntervalRef.current);
              }

              viewIntervalRef.current = setInterval(() => {
                const newText = text
                  .split("")
                  .map((_, index) => {
                    // Reveal direction logic
                    if (revealDirection === "left") {
                      if (index <= iteration) return text[index];
                    } else if (revealDirection === "right") {
                      if (text.length - 1 - index <= iteration) return text[text.length - 1 - index];
                    } else {
                      // center - reveal from both ends
                      const center = Math.floor(text.length / 2);
                      const distanceFromCenter = Math.abs(index - center);
                      if (distanceFromCenter <= iteration / 2) return text[index];
                    }

                    // Show random character during animation
                    if (iteration < maxIterations) {
                      return getRandomChar();
                    }
                    return text[index];
                  })
                  .join("");

                setDisplayText(newText);
                iteration += 1;

                if (iteration >= maxIterations) {
                  if (viewIntervalRef.current) {
                    clearInterval(viewIntervalRef.current);
                    viewIntervalRef.current = null;
                  }
                  setDisplayText(text);
                  setIsRevealed(true);
                  setIsAnimating(false);
                }
              }, speed);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(elementRef.current);
      return () => {
        observer.disconnect();
        if (viewIntervalRef.current) {
          clearInterval(viewIntervalRef.current);
          viewIntervalRef.current = null;
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn, isRevealed, text, speed, maxIterations, revealDirection]);

  /**
   * Handles hover events for 'hover' trigger mode.
   */
  const handleMouseEnter = () => {
    if (animateOn === "hover" && !isRevealed) {
      startAnimation();
    }
  };

  return (
    <span
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      className={cn(parentClassName, className)}
    >
      <span
        className={cn(
          "transition-opacity",
          isRevealed ? "opacity-100" : encryptedClassName || "opacity-90"
        )}
      >
        {displayText}
      </span>
    </span>
  );
};

