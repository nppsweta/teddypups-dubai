import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getPuppy, images, whatsappUrl } from "@/data/site";
import { pillClass } from "@/components/site/Buttons";
import { Eyebrow } from "@/components/site/Bits";
import { InquiryForm } from "@/components/site/InquiryForm";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/puppies/$slug")({
  loader: ({ params }) => {
    const puppy = getPuppy(params.slug);
    if (!puppy) throw notFound();
    return { puppy };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.puppy;
    if (!p) return { meta: [{ title: "Puppy not found — TeddyPups" }, { name: "robots", content: "noindex" }] };
    return { meta: pageMeta(`${p.name} — ${p.breedLabel} ${p.sex} | TeddyPups U.A.E.`, `${p.name}, a ${p.age} old ${p.breedLabel} ${p.sex}, is available at TeddyPups. Ask about this puppy on WhatsApp.`) };
  },
  notFoundComponent: () => (
    <div className="py-24 text-center">
      <h1 className="font-display text-4xl font-black">Puppy not found</h1>
      <Link to="/puppies" className="mt-4 inline-block font-semibold text-primary underline">See available puppies</Link>
    </div>
  ),
  component: PuppyPage,
});

function PuppyPage() {
  const { puppy: p } = Route.useLoaderData();
  const gallery = [p.image, images.pup5 === p.image ? images.pup1 : images.pup5];
  const [idx, setIdx] = useState(0);
  const label = p.name === p.breedLabel ? `the ${p.breedLabel} ${p.sex}` : `${p.name}, the ${p.breedLabel}`;
  const facts = [
    ["Breed", p.breedLabel],
    ["Boy or girl", p.sex[0].toUpperCase() + p.sex.slice(1)],
    ["Age", p.age],
    ["Where", p.origin === "imported" ? "Imported for you" : "In Dubai"],
  ];
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2">
        <div>
          <Eyebrow>hello, it's me</Eyebrow>
          <div className="relative mt-3 overflow-hidden rounded-3xl border-4 border-foreground shadow-sticker">
            <img src={gallery[idx]} alt={`${p.breedLabel} puppy, photo ${idx + 1}`} width={800} height={1000} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
              <button type="button" aria-label="Previous photo" onClick={() => setIdx((i) => (i + gallery.length - 1) % gallery.length)} className="grid h-10 w-10 place-items-center rounded-full bg-background text-xl font-bold">‹</button>
              <span className="rounded-full bg-background px-3 py-1 text-sm font-semibold">{idx + 1} / {gallery.length}</span>
              <button type="button" aria-label="Next photo" onClick={() => setIdx((i) => (i + 1) % gallery.length)} className="grid h-10 w-10 place-items-center rounded-full bg-background text-xl font-bold">›</button>
            </div>
          </div>
          <ul className="mt-3 flex gap-3">
            {gallery.map((g, i) => (
              <li key={i}>
                <button type="button" onClick={() => setIdx(i)} aria-label={`Show photo ${i + 1}`} aria-current={i === idx} className={`overflow-hidden rounded-xl border-2 ${i === idx ? "border-primary" : "border-transparent"}`}>
                  <img src={g} alt="" width={80} height={100} className="h-20 w-16 object-cover" />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">Illustrative photos — real photos of this puppy are shared on WhatsApp.</p>
        </div>
        <div className="md:pt-12">
          <span className="rounded-full bg-whatsapp px-3 py-1 text-sm font-bold text-whatsapp-foreground">Available</span>
          <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl">{p.name}</h1>
          <p className="text-xl text-muted-foreground">{p.breedLabel}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-secondary p-4">
                <dt className="font-hand text-lg text-primary">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <a href={whatsappUrl(`Hi TeddyPups! I'm interested in ${label}.`)} target="_blank" rel="noreferrer" className={pillClass({ variant: "whatsapp", className: "mt-6" })}>Ask about {p.name} on WhatsApp</a>
          <h2 className="mt-10 font-display text-2xl font-bold">Every Teddy Pup comes</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-muted-foreground">
            <li>Vaccinated</li><li>Dewormed</li><li>With a health certificate from a licensed vet</li><li>Fully checked before going home</li>
          </ul>
        </div>
      </section>
      <section className="bg-lattice px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center font-display text-4xl font-black">Ask about {p.name}</h2>
          <InquiryForm defaultPuppy={p.name === p.breedLabel ? `${p.breedLabel} (${p.sex})` : `${p.name} (${p.breedLabel}, ${p.sex})`} />
        </div>
      </section>
    </>
  );
}
