import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { serviceAreas } from "@/lib/data/areas";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Quick-link definitions                                             */
/* ------------------------------------------------------------------ */

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Service Areas", href: "/#areas" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

/* ------------------------------------------------------------------ */
/*  Social icon map                                                    */
/* ------------------------------------------------------------------ */

const socials = [
  {
    label: "Facebook",
    href: siteConfig.socials.facebook,
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: siteConfig.socials.instagram,
    icon: Instagram,
  },
  {
    label: "Google",
    href: siteConfig.socials.google,
    icon: ExternalLink,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative border-t border-border-light bg-gradient-to-b from-surface to-white",
        className,
      )}
    >
      {/* ---- Main grid ---- */}
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-14 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* --- Column 1: Brand --- */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-navy">
                {siteConfig.name}
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-light">
              {siteConfig.tagline}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "bg-hydra-50 text-hydra-700 transition-colors duration-200",
                    "hover:bg-hydra-100 hover:text-hydra-800",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-light transition-colors duration-200 hover:text-hydra-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 3: Service Areas --- */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy">
              Service Areas
            </h4>
            <ul className="space-y-2.5">
              {serviceAreas.map((area) => (
                <li key={area.id} className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-hydra-400" />
                  <span className="text-sm text-slate-light">
                    {area.name}, {area.state}
                  </span>
                  {area.primary && (
                    <span className="ml-1 inline-block rounded-full bg-hydra-100 px-1.5 py-0.5 text-[10px] font-medium leading-none text-hydra-700">
                      HQ
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 4: Contact --- */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="group flex items-start gap-2.5 text-sm text-slate-light transition-colors duration-200 hover:text-hydra-600"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-hydra-500 transition-colors group-hover:text-hydra-600" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-2.5 text-sm text-slate-light transition-colors duration-200 hover:text-hydra-600"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-hydra-500 transition-colors group-hover:text-hydra-600" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-light">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-hydra-500" />
                {siteConfig.address}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-light">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-hydra-500" />
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-border-light">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row lg:px-8">
          <p className="text-xs text-slate-light">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-slate-light">
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-hydra-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-hydra-600"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
