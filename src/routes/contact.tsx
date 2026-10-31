import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { contact, images, whatsappUrl } from "@/data/site";
import { PageHero } from "@/components/site/Bits";
import { pillClass } from "@/components/site/Buttons";
import { InquiryForm } from "@/components/site/InquiryForm";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: pageMeta("Visit & contact — TeddyPups U.A.E.", "Write to TeddyPups, message on WhatsApp, or visit the Downtown Dubai showroom.") }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="write us a little letter" title="Visit & contact" />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 lg:grid-cols-[1.4fr_1fr]">
        <InquiryForm />
        <aside className="space-y-4">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={pillClass({ variant: "whatsapp", className: "w-full" })}>WhatsApp {contact.phoneDisplay}</a>
          <div className="rounded-2xl bg-secondary p-5">
            <p className="font-hand text-xl text-primary">call us</p>
            <a href={contact.phoneHref} className="font-semibold hover:text-primary">{contact.phoneDisplay}</a>
            <p className="mt-3 font-hand text-xl text-primary">email</p>
            <a href={`mailto:${contact.email}`} className="break-all font-semibold hover:text-primary">{contact.email}</a>
          </div>
        </aside>
      </section>
      <section className="bg-lattice px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-black">Visit us in Downtown Dubai</h2>
            <p className="mt-3 text-muted-foreground">Come to the showroom and choose your puppy face-to-face.</p>
            <p className="mt-4 flex items-center gap-2 font-semibold"><MapPin className="h-5 w-5 text-primary" />{contact.location}</p>
            <a href={contact.mapsUrl} target="_blank" rel="noreferrer" className={pillClass({ className: "mt-6" })}>Open in Google Maps</a>
          </div>
          <img src={images.pup4} alt="Puppy in the showroom" loading="lazy" width={800} height={1000} className="h-80 w-full rounded-3xl border-4 border-foreground object-cover" />
        </div>
      </section>
    </>
  );
}
