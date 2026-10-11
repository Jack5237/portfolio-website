import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './stroke-text.css';

const DEFAULT_TEXT = 'Draw Attention';

interface StrokeTextProps {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  // ponytail: no 'scroll' — would pull in gsap/ScrollTrigger (~15kB) for nothing
  trigger?: 'mount' | 'hover' | 'loop';
  fillMode?: 'fade' | 'wipe' | 'none';
  fontSize?: number | string;
  fontWeight?: number | string;
  letterSpacing?: number | string;
  reverse?: boolean;
  repeatDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const StrokeText = ({
  text = DEFAULT_TEXT,
  strokeColor = '#A78BFA',
  fillColor = '#F8FAFC',
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = 'power2.out',
  trigger = 'mount',
  fillMode = 'wipe',
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  reverse = false,
  repeatDelay = 0.9,
  className = '',
  style = {}
}: StrokeTextProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const strokeTextRef = useRef<SVGTextElement>(null);
  const wipeRectRef = useRef<SVGRectElement>(null);

  const [box, setBox] = useState<DOMRect | null>(null);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const characters = useMemo(() => Array.from(String(text ?? '')), [text]);

  const numFontSize = typeof fontSize === 'string' ? Number.parseFloat(fontSize) : fontSize;
  const dash = Math.max(numFontSize * 7, 200);

  // ponytail: fixed em box (baseline at 0) so every instance scales identically,
  // regardless of whether the string has ascenders/descenders.
  const emTop = -numFontSize;
  const emHeight = numFontSize * 1.3;

  const fontStyle = useMemo(
    () => ({
      fontSize: typeof fontSize === 'string' ? fontSize : `${fontSize}px`,
      fontWeight,
      letterSpacing: typeof letterSpacing === 'string' ? letterSpacing : `${letterSpacing}px`
    }),
    [fontSize, fontWeight, letterSpacing]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs only on listed deps
  useLayoutEffect(() => {
    const node = strokeTextRef.current;
    if (!node) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled || !strokeTextRef.current) return;
      let bbox: DOMRect | null = null;
      try {
        const bboxDOMRect = strokeTextRef.current.getBBox();
        bbox = {
          x: bboxDOMRect.x,
          y: bboxDOMRect.y,
          width: bboxDOMRect.width,
          height: bboxDOMRect.height,
          top: bboxDOMRect.top,
          bottom: bboxDOMRect.bottom,
          left: bboxDOMRect.left,
          right: bboxDOMRect.right,
          toJSON: () => ({})
        };
      } catch {
        return;
      }
      if (!bbox || !bbox.width) return;

      const pad = Math.max(Number(strokeWidth) || 1, numFontSize * 0.1);
      const next: DOMRect = {
        x: bbox.x - pad,
        y: bbox.y - pad,
        width: bbox.width + pad * 2,
        height: bbox.height + pad * 2,
        top: bbox.top - pad,
        bottom: bbox.bottom + pad,
        left: bbox.left - pad,
        right: bbox.right + pad,
        toJSON: () => ({})
      };

      setBox(prev =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5
          ? prev
          : next
      );
    };

    measure();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [characters, fontSize, fontWeight, letterSpacing, strokeWidth, numFontSize]);

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === 'undefined' || !root || !box) return undefined;

    const strokes = gsap.utils.toArray<SVGTSpanElement>(root.querySelectorAll('[data-stroke-char]'));
    const fills = gsap.utils.toArray<SVGTSpanElement>(root.querySelectorAll('[data-fill-char]'));
    const wipe = wipeRectRef.current;
    if (!strokes.length) return undefined;

    const fillEnabled = fillMode !== 'none';
    const useWipe = fillEnabled && fillMode === 'wipe';
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const staggerConfig = reverse ? { each: stagger, from: 'end' as const } : stagger;
    const targets = [...strokes, ...fills, wipe].filter(Boolean);

    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
    };

    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: fillEnabled ? box.width : 0 } });
    };

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEnd();
      return () => gsap.killTweensOf(targets);
    }

    const build = () => {
      setStart();
      const tl = gsap.timeline({ paused: true, defaults: { overwrite: 'auto' } });

      tl.to(strokes, { strokeDashoffset: 0, duration: drawDuration, ease, stagger: staggerConfig }, 0);

      if (useWipe && wipe) {
        tl.to(
          wipe,
          { attr: { width: box.width }, duration: fillDuration, ease: 'power2.inOut' },
          drawDuration + fillDelay
        );
      } else if (fillEnabled) {
        tl.to(
          fills,
          { opacity: 1, duration: fillDuration, ease: 'power2.out', stagger: staggerConfig },
          drawDuration + fillDelay
        );
      }

      return tl;
    };

    // ponytail: looping the intro would blank the heading every cycle. Instead the
    // fill stays put and only the stroke sweeps over it — on, then off in the same
    // direction, so it ends invisible and the next pass starts clean.
    const buildRetrace = () => {
      const sweep = drawDuration * 0.75;
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay, defaults: { overwrite: 'auto' } });
      tl.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      tl.to(strokes, { strokeDashoffset: 0, duration: sweep, ease, stagger: staggerConfig }, 0);
      tl.to(
        strokes,
        { strokeDashoffset: -dash, duration: sweep, ease: 'power2.in', stagger: staggerConfig },
        sweep + 0.3
      );
      return tl;
    };

    let timeline: gsap.core.Timeline | null = null;
    let loop: gsap.core.Timeline | null = null;
    let removeHover: (() => void) | null = null;

    if (trigger === 'hover') {
      setEnd();
      const play = () => {
        timeline?.kill();
        timeline = build();
        timeline.play(0);
      };
      root.addEventListener('pointerenter', play);
      removeHover = () => root.removeEventListener('pointerenter', play);
    } else {
      timeline = build();
      if (trigger === 'loop') {
        timeline.eventCallback('onComplete', () => {
          loop = buildRetrace();
          loop.play(0);
        });
      }
      timeline.play(0);
    }

    return () => {
      removeHover?.();
      loop?.kill();
      timeline?.kill();
      gsap.killTweensOf(targets);
    };
  }, [box, dash, drawDuration, fillDelay, stagger, ease, trigger, fillMode, reverse, repeatDelay]);

  const viewBox = box
    ? `${box.x} ${emTop} ${box.width} ${emHeight}`
    : `0 ${emTop} ${numFontSize * 6} ${emHeight}`;

  return (
    <span
      ref={rootRef}
      className={`stroke-text ${trigger === 'hover' ? 'stroke-text--hover' : ''} ${className}`.trim()}
      style={style}
      role="img"
      aria-label={String(text ?? '')}
    >
      <svg className="stroke-text__svg" viewBox={viewBox} preserveAspectRatio="xMinYMid meet" aria-hidden="true">
        {fillMode === 'wipe' && box && (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect ref={wipeRectRef} x={box.x} y={emTop} width="0" height={emHeight} />
            </clipPath>
          </defs>
        )}

        <text
          ref={strokeTextRef}
          className="stroke-text__stroke"
          x="0"
          y="0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={fontStyle as React.CSSProperties}
        >
          {characters.map((char, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list that is never reordered
            <tspan data-stroke-char key={`s-${index}`}>
              {char}
            </tspan>
          ))}
        </text>

        <text
          className="stroke-text__fill"
          x="0"
          y="0"
          fill={fillColor}
          stroke="none"
          style={fontStyle as React.CSSProperties}
          clipPath={fillMode === 'wipe' && box ? `url(#${wipeId})` : undefined}
        >
          {characters.map((char, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list that is never reordered
            <tspan data-fill-char key={`f-${index}`}>
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
};

export default StrokeText;
