import { Link } from "@tanstack/react-router";
import { Menu, PawPrint, X } from "lucide-react";
import { useState } from "react";
import { whatsappUrl } from "@/data/site";
import { pillClass } from "./Buttons";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/puppies", label: "Puppies" },
  { to: "/happy-families", label: "Happy families" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Visit & contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="TeddyPups home">
      <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-primary bg-accent text-primary">
        <PawPrint className="h-5 w-5" aria-hidden />
      </span>
      <span className="font-display text-xl font-black">TeddyPups</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-background/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-8 text-[15px] font-semibold">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  className="relative py-2 hover:text-primary data-[status=active]:text-primary"
                  activeProps={{ "aria-current": "page" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={pillClass({ variant: "whatsapp", size: "sm", className: "hidden sm:inline-flex" })}>
            WhatsApp us
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t bg-background lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-display text-xl font-bold data-[status=active]:text-primary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={pillClass({ variant: "whatsapp", className: "w-full" })}>
                WhatsApp us
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
