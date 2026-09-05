"use client";

import {
  type MotionValue,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const KEY_PREFIX_LENGTH = 3;

interface ScrollRevealParagraphProps {
  className?: string;
  paragraph: string;
  progress: MotionValue<number>;
}

function ScrollRevealParagraph({
  paragraph,
  className = "",
  progress,
}: ScrollRevealParagraphProps) {
  const words = paragraph.split(" ");

  return (
    <p
      className={`text-center text-5xl md:text-5xl font-medium leading-[1.15] tracking-tight ${className}`}
    >
      {words.map((word, i) => {
        const step = 1 / Math.max(words.length, 1);

        const start = Math.max(0, i * step - 0.05);
        const end = Math.min(1, start + step * 0.85);

        return (
          <Word
            key={`word-${i}-${word.slice(0, KEY_PREFIX_LENGTH)}`}
            progress={progress}
            range={[start, end]}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const shouldReduceMotion = useReducedMotion();

  const opacity = useTransform(
    progress,
    range,
    shouldReduceMotion ? [1, 1] : [0, 1]
  );

  return (
    <span className="relative mr-3 inline-block">
      {!shouldReduceMotion && (
        <span className="text-foreground/10">{children}</span>
      )}

      <m.span
        className="absolute inset-0 text-foreground"
        style={{ opacity }}
      >
        {children}
      </m.span>
    </span>
  );
}

export default function ScrollText() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.2"],
  });

  const longParagraph = `From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.`;

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh] w-full bg-white dark:bg-black-100"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="max-w-6xl px-8">
          <ScrollRevealParagraph
            paragraph={longParagraph}
            progress={scrollYProgress}
          />
        </div>
      </div>
    </section>
  );
}