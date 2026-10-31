import type { ReactNode } from "react";
import { faqs } from "@/data/site";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-hand text-2xl text-primary sm:text-3xl">{children}</p>;
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-glow px-5 pb-10 pt-14 text-center sm:pt-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mx-auto mt-2 max-w-4xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">{title}</h1>
      {children && <div className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{children}</div>}
    </section>
  );
}

/** Native <details> accordion: keyboard + screen-reader accessible with no JS. */
export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="group rounded-2xl border-2 border-foreground bg-card px-5 py-4 open:shadow-sticker">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
