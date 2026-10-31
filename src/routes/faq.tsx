import { createFileRoute } from "@tanstack/react-router";
import { faqs, whatsappUrl } from "@/data/site";
import { FaqList, PageHero } from "@/components/site/Bits";
import { pillClass } from "@/components/site/Buttons";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: pageMeta("FAQ — TeddyPups U.A.E.", "Answers about vaccinations, showroom visits, imports, delivery and aftercare for TeddyPups puppies."),
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }),
    }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="you asked, we answered" title="Questions, answered" />
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <FaqList />
        <div className="mt-10 text-center">
          <p className="mb-3 text-muted-foreground">Still curious?</p>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={pillClass({ variant: "whatsapp" })}>Ask us on WhatsApp</a>
        </div>
      </section>
    </>
  ),
});
