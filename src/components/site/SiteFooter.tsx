import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { contact, whatsappUrl } from "@/data/site";
import { Logo, navItems } from "./SiteHeader";

export function SiteFooter() {
  return (
    <>
      <footer className="border-t bg-cream pb-24 sm:pb-10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
          <div className="space-y-3">
            <Logo />
            <p className="font-hand text-2xl text-primary">every puppy is family</p>
            <p className="text-sm text-muted-foreground">Teacup and designer puppies in Dubai — meet them in the showroom or order from abroad.</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="mb-3 font-display text-lg font-bold">Explore</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navItems.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>
              ))}
            </ul>
          </nav>
          <address className="space-y-2 text-sm not-italic">
            <h2 className="mb-3 font-display text-lg font-bold">Say hello</h2>
            <p><a className="hover:text-primary" href={contact.phoneHref}>{contact.phoneDisplay}</a></p>
            <p><a className="hover:text-primary" href={`mailto:${contact.email}`}>{contact.email}</a></p>
            <p>{contact.location}</p>
          </address>
        </div>
        <p className="text-center text-xs text-muted-foreground">© {new Date().getFullYear()} TeddyPups U.A.E.</p>
      </footer>
      {/* Mobile sticky contact bar (mirrors the reference's bottom WhatsApp / Call bar) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t bg-background/95 p-3 backdrop-blur sm:hidden">
        <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp py-3 font-semibold text-whatsapp-foreground">
          <MessageCircle className="h-4 w-4" /> WhatsApp us
        </a>
        <a href={contact.phoneHref} className="flex items-center justify-center gap-2 rounded-full border-2 border-foreground px-5 py-3 font-semibold">
          <Phone className="h-4 w-4" /> Call
        </a>
      </div>
    </>
  );
}
