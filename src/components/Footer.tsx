import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock, ExternalLink, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { serviceAreas } from "@/lib/data/areas";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Quick-link definitions                                             */
/* ------------------------------------------------------------------ */

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/plans" },
  { label: "Service Areas", href: "/areas" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
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
        "relative overflow-hidden bg-navy",
        className,
      )}
    >
      {/* ---- Decorative top wave ---- */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-hydra-400 via-hydra-500 to-hydra-400" />

      {/* ---- Ambient glow ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(ellipse, #27B6E6, transparent 70%)",
        }}
      />

      {/* ---- CTA Banner ---- */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-10 sm:flex-row lg:px-8">
          <div>
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Ready for a crystal-clear pool?
            </h3>
            <p className="mt-1 text-sm text-white/60">
              Get a free, no-obligation quote today.
            </p>
          </div>
          <Link
            href="/#get-quote"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold",
              "bg-hydra-500 text-white shadow-lg shadow-hydra-500/25",
              "transition-all duration-200",
              "hover:-translate-y-0.5 hover:bg-hydra-400 hover:shadow-xl hover:shadow-hydra-500/30",
              "active:scale-[0.97]",
            )}
          >
            Get a Quote
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ---- Main grid ---- */}
      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-14 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* --- Column 1: Brand --- */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-light.png"
                alt={siteConfig.name}
                width={200}
                height={200}
                className="h-20 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              {siteConfig.tagline}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "bg-white/10 text-white/70 transition-all duration-200",
                    "hover:bg-hydra-500 hover:text-white hover:-translate-y-0.5",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1.5 text-sm text-white/60 transition-colors duration-200 hover:text-hydra-400"
                  >
                    <ChevronRight className="h-3 w-3 text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-hydra-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 3: Service Areas --- */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
              Service Areas
            </h4>
            <ul className="space-y-3">
              {serviceAreas.map((area) => (
                <li key={area.id} className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-hydra-400/60" />
                  <span className="text-sm text-white/60">
                    {area.name}, {area.state}
                  </span>
                  {area.primary && (
                    <span className="ml-1 inline-block rounded-full bg-hydra-500/20 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-hydra-400">
                      HQ
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 4: Contact --- */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="group flex items-start gap-2.5 text-sm text-white/60 transition-colors duration-200 hover:text-hydra-400"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-hydra-500/20">
                    <Phone className="h-3.5 w-3.5 text-hydra-400" />
                  </span>
                  <span className="pt-1">{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-2.5 text-sm text-white/60 transition-colors duration-200 hover:text-hydra-400"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-hydra-500/20">
                    <Mail className="h-3.5 w-3.5 text-hydra-400" />
                  </span>
                  <span className="pt-1">{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="h-3.5 w-3.5 text-hydra-400" />
                </span>
                <span className="pt-1">{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Clock className="h-3.5 w-3.5 text-hydra-400" />
                </span>
                <span className="pt-1">{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row lg:px-8">
          <p className="text-xs text-white/40">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-white/40">
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-hydra-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-hydra-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
