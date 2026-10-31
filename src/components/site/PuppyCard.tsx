import { Link } from "@tanstack/react-router";
import type { Puppy } from "@/data/site";

export function PuppyCard({ puppy }: { puppy: Puppy }) {
  const showName = puppy.name !== puppy.breedLabel;
  return (
    <Link
      to="/puppies/$slug"
      params={{ slug: puppy.slug }}
      className="group block rounded-3xl border-2 border-foreground bg-card p-3 shadow-sticker transition-transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img src={puppy.image} alt={`${puppy.breedLabel} puppy (${puppy.sex})`} loading="lazy" width={800} height={1000} className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-whatsapp px-3 py-1 text-xs font-bold text-whatsapp-foreground">Available</span>
        {puppy.hasVideo && <span className="absolute right-3 top-3 rounded-full bg-background px-3 py-1 text-xs font-bold">▶ video</span>}
      </div>
      <div className="px-1 pb-1 pt-3">
        <h3 className="font-display text-xl font-bold leading-tight">{puppy.name}</h3>
        <p className="text-sm text-muted-foreground">{[showName && puppy.breedLabel, puppy.sex, puppy.age].filter(Boolean).join(" · ")}</p>
      </div>
    </Link>
  );
}
