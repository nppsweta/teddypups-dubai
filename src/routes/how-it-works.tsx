import { createFileRoute, Link } from "@tanstack/react-router";
import { images, whatsappUrl } from "@/data/site";
import { PageHero } from "@/components/site/Bits";
import { pillClass } from "@/components/site/Buttons";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: pageMeta("How it works — TeddyPups U.A.E.", "Two ways home: meet a puppy in person at our Downtown Dubai showroom, or reserve an imported teacup puppy upon request.") }),
  component: HowPage,
});

const local = [
  ["Explore our puppies", "Browse the listings for photos, breed, age and health info."],
  ["Choose your puppy", "Open a profile to learn more, or message us with any questions."],
  ["Meet before you choose", "Spend some time together before you decide."],
  ["Pick-up or delivery", "Collect from the showroom or get safe home delivery within Dubai."],
];
const imported = [
  ["Reserve your puppy", "Pick a breed and reserve — each puppy is sourced to your preferences."],
  ["Personal consultation", "We finalise the details with you and keep you updated along the way."],
  ["Import and arrival", "Health checks, travel and paperwork are all handled for you."],
  ["Welcome home", "We help your puppy settle in smoothly."],
];

function Steps({ items }: { items: string[][] }) {
  return (
    <ol className="mt-6 space-y-4">
      {items.map(([t, d], i) => (
        <li key={t} className="flex gap-4 rounded-2xl border-2 border-foreground bg-card p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display font-black text-primary-foreground">{i + 1}</span>
          <div><h4 className="font-display text-lg font-bold">{t}</h4><p className="text-muted-foreground">{d}</p></div>
        </li>
      ))}
    </ol>
  );
}

function HowPage() {
  return (
    <>
      <PageHero eyebrow="choose your way" title="Two ways home" />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 md:grid-cols-2">
        <article>
          <img src={images.pup4} alt="Meeting a puppy in the showroom" loading="lazy" width={800} height={1000} className="h-64 w-full rounded-3xl object-cover" />
          <p className="mt-6 font-hand text-2xl text-primary">in Dubai · meet in person</p>
          <h2 className="font-display text-3xl font-black">Meet your puppy in person</h2>
          <p className="mt-3 text-muted-foreground">Choose face-to-face at our Downtown Dubai showroom. Local puppies come from trusted breeders and are raised with good food, care and vet checks.</p>
          <Steps items={local} />
          <Link to="/puppies" search={{ origin: "local" }} className={pillClass({ className: "mt-6" })}>Meet local puppies</Link>
        </article>
        <article>
          <img src={images.pup2} alt="Imported teacup puppy" loading="lazy" width={800} height={1000} className="h-64 w-full rounded-3xl object-cover" />
          <p className="mt-6 font-hand text-2xl text-primary">imported · order upon request</p>
          <h2 className="font-display text-3xl font-black">Order upon request</h2>
          <p className="mt-3 text-muted-foreground">Access sought-after teacup breeds from certified breeders in Europe, Korea and beyond — from Korean teacup poodles to rare Maltese, Pom and Yorkie lines.</p>
          <Steps items={imported} />
          <a href={whatsappUrl("Hi TeddyPups! I'd like to order a puppy upon request.")} target="_blank" rel="noreferrer" className={pillClass({ variant: "whatsapp", className: "mt-6" })}>Reserve on WhatsApp</a>
        </article>
      </section>
    </>
  );
}
