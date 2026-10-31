import { useState, type FormEvent } from "react";
import { z } from "zod";
import { puppies, whatsappUrl } from "@/data/site";
import { pillClass } from "./Buttons";

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(100),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,20}$/, "Enter a phone number with country code, e.g. +971 50 123 4567"),
  email: z.union([z.literal(""), z.string().trim().email("That email doesn't look right").max(255)]),
  area: z.string().trim().max(100),
  puppy: z.string().max(120),
  message: z.string().trim().max(1000, "Please keep it under 1000 characters"),
});
type Fields = z.infer<typeof inquirySchema>;
const empty: Fields = { name: "", phone: "", email: "", area: "", puppy: "", message: "" };

/**
 * Front-end only: there is no backend in this clone, so a valid submission shows a
 * success state and offers to send the same details via WhatsApp.
 */
export function InquiryForm({ defaultPuppy = "" }: { defaultPuppy?: string }) {
  const [values, setValues] = useState<Fields>({ ...empty, puppy: defaultPuppy });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));

  function submit(e: FormEvent) {
    e.preventDefault();
    const r = inquirySchema.safeParse(values);
    if (!r.success) {
      const errs: typeof errors = {};
      for (const i of r.error.issues) errs[i.path[0] as keyof Fields] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  if (sent) {
    const text = `Hi TeddyPups! I'm ${values.name}${values.puppy ? `, asking about ${values.puppy}` : ""}. ${values.message}`.trim();
    return (
      <div role="status" className="rounded-3xl border-2 border-foreground bg-card p-8 text-center shadow-sticker">
        <p className="font-hand text-3xl text-primary">letter posted!</p>
        <h3 className="mt-2 font-display text-2xl font-bold">Thank you, {values.name}</h3>
        <p className="mt-2 text-muted-foreground">For the quickest reply, send your note straight to the team on WhatsApp.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={whatsappUrl(text)} target="_blank" rel="noreferrer" className={pillClass({ variant: "whatsapp" })}>Send on WhatsApp</a>
          <button type="button" className={pillClass({ variant: "outline" })} onClick={() => { setSent(false); setValues({ ...empty, puppy: defaultPuppy }); }}>Write another</button>
        </div>
      </div>
    );
  }

  const field = "mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 outline-none focus:border-primary";
  const err = (k: keyof Fields) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p>;
  const aria = (k: keyof Fields) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form noValidate onSubmit={submit} className="grid gap-4 rounded-3xl border-2 border-foreground bg-card p-6 shadow-sticker sm:grid-cols-2 sm:p-8">
      <p className="font-hand text-3xl text-primary sm:col-span-2">Dear TeddyPups,</p>
      <label className="text-sm font-semibold">Your name *<input className={field} value={values.name} onChange={set("name")} autoComplete="name" {...aria("name")} />{err("name")}</label>
      <label className="text-sm font-semibold">Phone or WhatsApp *<input className={field} value={values.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="+971 50 123 4567" {...aria("phone")} />{err("phone")}</label>
      <label className="text-sm font-semibold">Email (optional)<input className={field} type="email" value={values.email} onChange={set("email")} autoComplete="email" {...aria("email")} />{err("email")}</label>
      <label className="text-sm font-semibold">Your area (optional)<input className={field} value={values.area} onChange={set("area")} placeholder="e.g. Dubai Marina" /></label>
      <label className="text-sm font-semibold sm:col-span-2">Puppy you're interested in (optional)
        <select className={field} value={values.puppy} onChange={set("puppy")}>
          <option value="">Any puppy (not sure yet)</option>
          {puppies.map((p) => {
            const label = p.name === p.breedLabel ? `${p.breedLabel} (${p.sex})` : `${p.name} (${p.breedLabel}, ${p.sex})`;
            return <option key={p.slug} value={label}>{label}</option>;
          })}
        </select>
      </label>
      <label className="text-sm font-semibold sm:col-span-2">Message (optional)<textarea rows={4} className={field} value={values.message} onChange={set("message")} {...aria("message")} />{err("message")}</label>
      <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
        <p className="font-hand text-2xl text-muted-foreground">with love, a future puppy parent</p>
        <button type="submit" className={pillClass({ variant: "primary" })}>Post my letter</button>
      </div>
    </form>
  );
}
