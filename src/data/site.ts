import pup1 from "@/assets/pup-1.jpg";
import pup2 from "@/assets/pup-2.jpg";
import pup3 from "@/assets/pup-3.jpg";
import pup4 from "@/assets/pup-4.jpg";
import pup5 from "@/assets/pup-5.jpg";
import pup6 from "@/assets/pup-6.jpg";
import pup7 from "@/assets/pup-7.jpg";
import pup8 from "@/assets/pup-8.jpg";
import pup9 from "@/assets/pup-9.jpg";
import family1 from "@/assets/family-1.jpg";

// Contact details as published on the reference site (puppy.instabizweb.com).
export const contact = {
  phoneDisplay: "+971 54 167 6733",
  phoneHref: "tel:+971541676733",
  email: "teddypupsadmin@gmail.com",
  location: "Downtown Dubai, United Arab Emirates",
  mapsUrl: "https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7",
};

export function whatsappUrl(text = "Hi TeddyPups! I'd love to know more about your puppies.") {
  return `https://wa.me/971541676733?text=${encodeURIComponent(text)}`;
}

export const images = { pup1, pup2, pup3, pup4, pup5, pup6, pup7, pup8, pup9, family1 };

export type Breed = "maltipoo" | "pomeranian" | "poodle" | "cavapoo" | "shih-tzu";
export type Origin = "local" | "imported";

export type Puppy = {
  slug: string;
  name: string;
  breedLabel: string;
  breeds: Breed[];
  sex: "boy" | "girl" | "boy & girl";
  age: string;
  origin: Origin;
  hasVideo?: boolean;
  image: string;
};

export const breeds: { id: Breed; label: string }[] = [
  { id: "maltipoo", label: "Maltipoo" },
  { id: "pomeranian", label: "Pomeranian" },
  { id: "poodle", label: "Poodle" },
  { id: "cavapoo", label: "Cavapoo" },
  { id: "shih-tzu", label: "Shih Tzu" },
];

// Listing facts (name, breed, sex, age, video flag) mirror the reference as of Oct 2026.
// Photos are stand-in imagery — NOT the actual puppies. Origin is only evidenced for
// "Korean Teacup" listings and Max; others default to "local" (see README).
const img = [pup1, pup2, pup3, pup4, pup5, pup6, pup7, pup8, pup9];
const raw: Omit<Puppy, "image">[] = [
  { slug: "maltipoo-max-male", name: "Max", breedLabel: "Maltipoo", breeds: ["maltipoo"], sex: "boy", age: "3 months", origin: "imported", hasVideo: true },
  { slug: "korean-teacup-maltipoo-female", name: "Korean Teacup Maltipoo", breedLabel: "Korean Teacup Maltipoo", breeds: ["maltipoo"], sex: "girl", age: "2 months", origin: "imported", hasVideo: true },
  { slug: "korean-teacup-poodle-female", name: "Korean Teacup Poodle", breedLabel: "Korean Teacup Poodle", breeds: ["poodle"], sex: "girl", age: "2 months", origin: "imported" },
  { slug: "maltipoo-cavapoo-male", name: "Maltipoo & Cavapoo", breedLabel: "Maltipoo & Cavapoo", breeds: ["maltipoo", "cavapoo"], sex: "boy", age: "3 months Maltipoo & 2 months Cavapoo", origin: "local", hasVideo: true },
  { slug: "toy-poodle-male-female", name: "Toy Poodle", breedLabel: "Toy Poodle", breeds: ["poodle"], sex: "boy & girl", age: "2 months", origin: "local" },
  { slug: "maltipoo-female-2", name: "Maltipoo", breedLabel: "Maltipoo", breeds: ["maltipoo"], sex: "girl", age: "3 months", origin: "local", hasVideo: true },
  { slug: "pomeranian-female", name: "Pomeranian", breedLabel: "Pomeranian", breeds: ["pomeranian"], sex: "girl", age: "3 months", origin: "local" },
  { slug: "copper-male", name: "Copper", breedLabel: "Cavapoo", breeds: ["cavapoo"], sex: "boy", age: "2 months", origin: "local" },
  { slug: "shitzu-female", name: "Shih Tzu", breedLabel: "Shih Tzu", breeds: ["shih-tzu"], sex: "girl", age: "2 months", origin: "local" },
  { slug: "shitzu-male", name: "Shih Tzu", breedLabel: "Shih Tzu", breeds: ["shih-tzu"], sex: "boy", age: "2 months", origin: "local" },
  { slug: "maltipoo-female-1", name: "Maltipoo", breedLabel: "Maltipoo", breeds: ["maltipoo"], sex: "girl", age: "2.5 months", origin: "local" },
  { slug: "maltipoo-female", name: "Maltipoo", breedLabel: "Maltipoo", breeds: ["maltipoo"], sex: "girl", age: "2 months", origin: "local" },
  { slug: "korean-teacup-pomeranian-1", name: "Korean Teacup Pomeranian", breedLabel: "Korean Teacup Pomeranian", breeds: ["pomeranian"], sex: "girl", age: "2 months", origin: "imported" },
  { slug: "korean-teacup-pomeranian", name: "Korean Teacup Pomeranian", breedLabel: "Korean Teacup Pomeranian", breeds: ["pomeranian"], sex: "girl", age: "2 months", origin: "imported" },
  { slug: "korean-teacup-pomeranian-male", name: "Korean Teacup Pomeranian", breedLabel: "Korean Teacup Pomeranian", breeds: ["pomeranian"], sex: "boy", age: "2 months", origin: "imported" },
];

// Rotate through a small pool of photos per breed so repeated breeds look different.
const breedPools: Record<Breed, string[]> = {
  maltipoo: [pup5, pup1, pup6],
  pomeranian: [pup2, pup9],
  poodle: [pup1, pup7],
  cavapoo: [pup4, pup8],
  "shih-tzu": [pup3, pup6],
};
const breedCounts: Partial<Record<Breed, number>> = {};
const imgFor = (p: Omit<Puppy, "image">) => {
  const breed = p.breeds[0];
  const pool = breedPools[breed];
  const n = breedCounts[breed] ?? 0;
  breedCounts[breed] = n + 1;
  return pool[n % pool.length];
};

export const puppies: Puppy[] = raw.map((p, i) => ({ ...p, image: imgFor(p, i) }));

export const getPuppy = (slug: string) => puppies.find((p) => p.slug === slug);

export const faqs = [
  { q: "Are your puppies vaccinated and health-checked?", a: "Yes. Each puppy is vaccinated, dewormed and examined, and comes with a health certificate from a licensed vet." },
  { q: "Can I meet a puppy before I decide?", a: "Yes. Puppies available locally can be visited at the Downtown Dubai showroom so you can spend time together first." },
  { q: "Can I take my puppy home the same day?", a: "Locally available puppies can go home with you the same day." },
  { q: "Do you import puppies from abroad?", a: "Yes. The Order Upon Request service sources teacup and rare breeds from certified breeders in Europe, Korea and elsewhere." },
  { q: "How does an imported puppy travel to Dubai?", a: "The team arranges health checks, travel and all paperwork so the puppy arrives safely." },
  { q: "Will I see photos and health details first?", a: "Yes. Real photos, videos and health certificates are shared on WhatsApp before your puppy travels." },
  { q: "Do you deliver?", a: "Yes — within Dubai, and internationally through cargo partners." },
  { q: "Which breeds do you usually have?", a: "Commonly Maltipoo, Pomeranian, Poodle and Bichon, plus rarer teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie." },
  { q: "Is there help after my puppy comes home?", a: "Yes. Support is available around the clock for training, nutrition and everyday care questions." },
];
