import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { breeds, puppies } from "@/data/site";
import { filterPuppies } from "@/lib/filter";
import { PageHero } from "@/components/site/Bits";
import { PuppyCard } from "@/components/site/PuppyCard";
import { pageMeta } from "@/lib/meta";

const search = z.object({
  origin: z.enum(["local", "imported"]).optional().catch(undefined),
  breed: z.enum(["maltipoo", "pomeranian", "poodle", "cavapoo", "shih-tzu"]).optional().catch(undefined),
  sex: z.enum(["boy", "girl"]).optional().catch(undefined),
});

export const Route = createFileRoute("/puppies/")({
  validateSearch: search,
  head: () => ({ meta: pageMeta("Available puppies — TeddyPups U.A.E.", "Browse teacup and designer puppies available now in Dubai or to import: Maltipoo, Pomeranian, Poodle, Cavapoo and Shih Tzu.") }),
  component: PuppiesPage,
});

function Chip({ active, children, to }: { active: boolean; children: React.ReactNode; to: z.infer<typeof search> }) {
  return (
    <Link
      to="/puppies"
      search={to}
      aria-pressed={active}
      className={`rounded-full border-2 border-foreground px-4 py-1.5 text-sm font-semibold transition-colors ${active ? "bg-foreground text-background" : "bg-background hover:bg-accent"}`}
    >
      {children}
    </Link>
  );
}

function PuppiesPage() {
  const s = Route.useSearch();
  const list = filterPuppies(puppies, s);
  const groups = [
    { label: "where", key: "origin" as const, opts: [[undefined, "Everywhere"], ["local", "In Dubai"], ["imported", "Imported"]] as const },
    { label: "breed", key: "breed" as const, opts: [[undefined, "All"], ...breeds.map((b) => [b.id, b.label] as const)] },
    { label: "boy or girl", key: "sex" as const, opts: [[undefined, "Both"], ["boy", "Boys"], ["girl", "Girls"]] as const },
  ];
  return (
    <>
      <PageHero eyebrow="from Teddy's sketchbook" title="Available puppies">
        Open a profile to see more of each puppy, then ask us about them on WhatsApp.
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="space-y-3 rounded-3xl bg-secondary p-5" role="group" aria-label="Filter puppies">
          {groups.map((g) => (
            <div key={g.key} className="flex flex-wrap items-center gap-2">
              <span className="w-24 font-hand text-xl text-primary">{g.label}</span>
              {g.opts.map(([v, l]) => (
                <Chip key={l} active={s[g.key] === v} to={{ ...s, [g.key]: v }}>{l}</Chip>
              ))}
            </div>
          ))}
        </div>
        <p className="my-6 font-semibold" aria-live="polite">
          {list.length} {list.length === 1 ? "puppy" : "puppies"} looking for a home
        </p>
        {list.length ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p) => <PuppyCard key={p.slug} puppy={p} />)}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed p-10 text-center">
            <p className="text-muted-foreground">No puppies match those filters right now.</p>
            <Link to="/puppies" className="mt-3 inline-block font-semibold text-primary underline">Clear filters</Link>
          </div>
        )}
      </section>
    </>
  );
}
