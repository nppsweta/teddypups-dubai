import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse, Plane, Clock, Globe2 } from "lucide-react";
import { breeds, images, puppies, whatsappUrl } from "@/data/site";
import { pillClass } from "@/components/site/Buttons";
import { PuppyCard } from "@/components/site/PuppyCard";
import { Eyebrow, FaqList } from "@/components/site/Bits";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => ({ meta: pageMeta("TeddyPups U.A.E. — Premium teacup puppies in Dubai", "Meet teacup and designer puppies at our Downtown Dubai showroom, or order a rare miniature breed from trusted breeders abroad.") }),
  component: Index,
});

const arches = [images.pup1, images.pup5, images.pup4, images.pup2, images.pup3];

function Index() {
  return (
    <>
      <section className="bg-glow overflow-hidden px-5 pt-14 text-center sm:pt-20">
        <Eyebrow>every puppy is family</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-4xl font-display text-6xl font-black leading-[0.9] tracking-tight sm:text-8xl">Premium teacup puppies in Dubai</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Visit our Dubai showroom to meet your new best friend, or let us bring a rare miniature breed to you from trusted breeders worldwide.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/puppies" className={pillClass()}>View available puppies</Link>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={pillClass({ variant: "outline" })}>Enquire on WhatsApp</a>
        </div>
        <ul className="mx-auto mt-14 flex max-w-6xl items-end justify-center gap-3 sm:gap-8" aria-label="Some of our puppies">
          {arches.map((src, i) => (
            <li key={i} className={`${i > 2 ? "hidden sm:block" : ""} ${i % 2 ? "mb-0" : "mb-6"}`}>
              <img src={src} alt="Teacup puppy" width={800} height={1000} loading={i ? "lazy" : "eager"} className="arch h-40 w-28 border-4 border-foreground object-cover sm:h-56 sm:w-40" />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-lattice px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-black sm:text-5xl">Looking for a home</h2>
            <Link to="/puppies" className={pillClass({ variant: "outline", size: "sm" })}>Meet them all</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {puppies.slice(0, 8).map((p) => <PuppyCard key={p.slug} puppy={p} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-center font-display text-4xl font-black sm:text-5xl">Two ways to meet your puppy</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border-2 border-foreground bg-card shadow-sticker">
            <img src={images.pup4} alt="Puppy held up in the showroom" loading="lazy" width={800} height={1000} className="h-72 w-full object-cover" />
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold">Puppies in Dubai</h3>
              <p className="mt-2 text-muted-foreground">Come and meet our locally available puppies in person before you decide.</p>
              <Link to="/puppies" search={{ origin: "local" }} className={pillClass({ size: "sm", className: "mt-4" })}>Meet local puppies</Link>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border-2 border-foreground bg-card shadow-sticker">
            <img src={images.pup2} alt="Imported teacup Pomeranian" loading="lazy" width={800} height={1000} className="h-72 w-full object-cover" />
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold">Imported for you</h3>
              <p className="font-hand text-xl text-primary">Korea → Dubai</p>
              <p className="mt-1 text-muted-foreground">Korean teacup puppies from reputable breeders, with the import handled for you.</p>
              <Link to="/puppies" search={{ origin: "imported" }} className={pillClass({ size: "sm", className: "mt-4" })}>See imported puppies</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-cream px-5 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-4xl font-black sm:text-5xl">Your puppy journey</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">A simple, step-by-step concierge from first message to first cuddle.</p>
          <ol className="mt-10 grid gap-6 text-left md:grid-cols-3">
            {[
              ["Choose your breed", "Pick a breed or tell us what you're after — we'll match you to what's available."],
              ["Get photos & details", "Receive real photos and health details on WhatsApp."],
              ["Safe delivery", "Once confirmed, we take care of everything so your puppy arrives calm and safe."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-3xl border-2 border-foreground bg-card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display font-black text-primary-foreground">{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {breeds.map((b) => (
              <Link key={b.id} to="/puppies" search={{ breed: b.id }} className="rounded-full border-2 border-foreground bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">{b.label}</Link>
            ))}
          </div>
          <Link to="/how-it-works" className={pillClass({ variant: "outline", className: "mt-8" })}>How it works</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-center font-display text-4xl font-black sm:text-5xl">Why families trust TeddyPups</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [HeartPulse, "Vet-checked & healthy", "Vaccinated, dewormed and sent home with a health certificate."],
            [Plane, "Korea to Dubai, safely", "Trusted breeders and careful travel from start to finish."],
            [Clock, "Support 24/7", "Help from choosing your puppy to long after they're home."],
            [Globe2, "Families worldwide", "Puppies delivered to loving homes around the world."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof HeartPulse;
            return (
              <li key={t as string} className="rounded-3xl bg-secondary p-6">
                <I className="h-8 w-8 text-primary" aria-hidden />
                <h3 className="mt-3 font-display text-lg font-bold">{t as string}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-lattice px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <img src={images.family1} alt="A family with their new puppy" loading="lazy" width={816} height={816} className="rounded-3xl border-4 border-foreground shadow-sticker" />
          <div>
            <h2 className="font-display text-4xl font-black sm:text-5xl">Happy families & puppies</h2>
            <p className="mt-4 text-muted-foreground">Nothing beats seeing our puppies settle into loving homes. Browse moments shared by the families who welcomed a Teddy Pup.</p>
            <Link to="/happy-families" className={pillClass({ className: "mt-6" })}>See every happy family</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="mb-8 text-center font-display text-4xl font-black sm:text-5xl">Questions, answered</h2>
        <FaqList limit={3} />
        <div className="mt-6 text-center"><Link to="/faq" className={pillClass({ variant: "outline", size: "sm" })}>Read all questions</Link></div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-primary px-6 py-14 text-center text-primary-foreground">
          <p className="font-hand text-3xl">welcome home</p>
          <h2 className="mt-2 font-display text-4xl font-black sm:text-5xl">Ready to meet your new best friend?</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">Expert guidance to find the right match, and a smooth, safe handover across the UAE.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={pillClass({ variant: "whatsapp" })}>Enquire on WhatsApp</a>
            <Link to="/contact" className={pillClass({ variant: "outline" })}>Visit & contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
