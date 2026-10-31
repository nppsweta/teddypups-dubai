import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { images, whatsappUrl } from "@/data/site";
import { PageHero } from "@/components/site/Bits";
import { pillClass } from "@/components/site/Buttons";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/happy-families")({
  head: () => ({ meta: pageMeta("Happy families — TeddyPups U.A.E.", "Moments shared by families who welcomed a TeddyPups puppy into their home.") }),
  component: FamiliesPage,
});

// Placeholder gallery: the reference shows 64 client photos which are not reused here.
const photos = [images.family1, images.pup1, images.pup5, images.pup4, images.pup2, images.pup3, images.pup5, images.pup1];

function FamiliesPage() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <PageHero eyebrow="our wall of happy endings" title="Happy families">
        Moments shared by families after welcoming their new puppy home.
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <p className="mb-6 rounded-2xl bg-secondary p-4 text-center text-sm text-muted-foreground">
          Placeholder gallery — replace with real client photos and approved testimonials.
        </p>
        <ul className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {photos.map((src, i) => (
            <li key={i} className="mb-4 break-inside-avoid">
              <button type="button" onClick={() => setOpen(i)} aria-label={`Enlarge photo ${i + 1}`} className="block w-full overflow-hidden rounded-2xl border-2 border-foreground">
                <img src={src} alt="A happy family puppy" loading="lazy" width={800} height={1000} className={`w-full object-cover transition-transform hover:scale-105 ${i % 3 ? "aspect-[4/5]" : "aspect-square"}`} />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={pillClass({ variant: "whatsapp" })}>Start your story on WhatsApp</a>
        </div>
      </section>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50 grid place-items-center bg-foreground/80 p-4" onClick={() => setOpen(null)}>
          <img src={photos[open]} alt="Enlarged family puppy" className="max-h-[85vh] rounded-2xl" onClick={(e) => e.stopPropagation()} />
          <button type="button" autoFocus aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background"><X /></button>
        </div>
      )}
    </>
  );
}
