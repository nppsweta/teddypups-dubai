# TeddyPups U.A.E. — website recreation

A close, responsive multi-page recreation of the reference site
https://puppy.instabizweb.com/ ("TeddyPups U.A.E. — Premium teacup puppies in Dubai"),
built as an assignment. React 19 + TypeScript + Tailwind CSS v4 on TanStack Start (Vite 7).

## Setup

```sh
npm i        # or: bun install
npm run dev  # dev server on http://localhost:8080
npm test     # vitest route smoke tests
```

## Project structure

```
src/
  data/site.ts            Single source of truth: contact details, WhatsApp helper,
                          puppy listings, breeds, FAQs
  routes/                 One file per page (TanStack Router file-based routing)
    index.tsx             Home
    puppies.index.tsx     Available puppies (breed / sex / origin filters)
    puppies.$slug.tsx     Individual puppy profile + enquiry form
    how-it-works.tsx      Order-upon-request process
    happy-families.tsx    Photo gallery with lightbox
    faq.tsx               FAQ accordion (+ FAQPage JSON-LD)
    contact.tsx           Contact page + enquiry form
    __root.tsx            Shared layout (header, footer, fonts, head metadata)
  components/site/
    SiteHeader.tsx        Sticky header, mobile menu, WhatsApp CTA
    SiteFooter.tsx        Footer + mobile sticky WhatsApp/Call bar
    PuppyCard.tsx         Listing card
    InquiryForm.tsx       Validated enquiry form (zod) with success state
    Buttons.tsx           Shared pill-button variants
    Bits.tsx              PageHero, Eyebrow, FaqList and small shared pieces
  lib/                    meta helpers, filter logic, utilities
  assets/                 Local puppy/family imagery
  test/                   Route smoke tests
```

## Key components and functionality

- **Routing** — every nav link resolves to a real route; unknown puppy slugs render a
  not-found state. Each page sets its own title/description/OG metadata.
- **Puppy filters** — breed, sex and origin filters on `/puppies` work client-side
  against the listing data in `src/data/site.ts`.
- **Enquiry form** — front-end validation via zod (name, phone with country code,
  optional email/message). A valid submission shows a success state and offers to
  forward the same details via WhatsApp; nothing is stored (no backend).
- **WhatsApp CTAs** — all buttons use the official click-to-chat format
  `https://wa.me/971541676733?text=<encoded message>`, open in a new tab, and puppy
  pages pre-fill a message naming that puppy. The number is configured once in
  `src/data/site.ts` (`whatsappUrl`).
- **Gallery** — happy-families photos open in a lightbox (Escape / backdrop click to close).
- **Mobile** — hamburger menu in the header and a sticky bottom WhatsApp/Call bar,
  mirroring the reference's mobile contact bar.

## Implementation decisions

- **Data-driven listings.** All puppy facts (name, breed, sex, age, video flag) live in
  one typed array in `src/data/site.ts`, mirroring the reference listings as of Oct 2026,
  so pages, filters and the enquiry form's puppy dropdown stay in sync automatically.
- **No backend.** The reference is a brochure site; the clone keeps it front-end only.
  The enquiry form validates and hands off to WhatsApp rather than storing submissions.
- **Semantic tokens for styling.** Colors, shadows and radii are theme tokens in
  `src/styles.css` (no hardcoded hex in components), keeping the playful sticker-card
  look consistent and themeable.
- **Local imagery.** Photos are bundled assets, so there are no hotlinked or broken images.

## Known deviations from the reference

- **Photos are stand-ins.** The reference's real puppy and client photos are not reused;
  all imagery is placeholder. Each puppy page notes that real photos are shared on WhatsApp.
- **Happy Families gallery is abbreviated.** The reference shows ~64 client photos; the
  clone shows a small placeholder grid with a note to swap in real, approved photos.
- **"Gone home" page not built.** The reference's page for puppies that already found
  homes is omitted.
- **Origin flags are partial.** "Imported" is only asserted for the Korean Teacup listings
  and Max, where the reference evidences it; other listings default to local.
- **No prices shown.** The reference does not publish prices, so none are invented.
- **Contact details** (phone, email, location) are copied from the reference as published.

## Verified vs. not verified

Verified in-browser: all routes render, filters, FAQ accordion, lightbox, form validation
and success state, mobile menu and sticky bar, and every WhatsApp button (wa.me format,
correct number, new tab, puppy-specific pre-filled messages). Test suite passes; no build
or console errors.

Not verified: pixel-perfect parity with the reference (compared structurally, not
screenshot-diffed), and real WhatsApp delivery — wa.me redirects to api.whatsapp.com,
which is blocked inside sandboxed previews but works on the published site.
