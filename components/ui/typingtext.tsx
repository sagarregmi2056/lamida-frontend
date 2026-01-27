"use client";

export function TypingText({ text, className }: { text: string; className?: string }) {
  return <span className={className}>{text}</span>;
}
