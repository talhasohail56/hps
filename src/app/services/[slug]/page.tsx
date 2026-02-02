import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CheckCircle,
  Clock,
  Users,
  ArrowLeft,
  Calendar,
  ArrowRight,
  Waves,
  FlaskConical,
  Filter,
  Wrench,
  HelpCircle,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

import { services } from "@/lib/data/services";
import { getPublishedPosts } from "@/lib/blog/db";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  Icon mapping                                                       */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Waves,
  FlaskConical,
  Filter,
  Wrench,
};

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] ?? HelpCircle;

  /* Fetch related blog posts tagged with this service id */
  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts.filter((post) => post.tags.includes(slug));

  return (
    <>
      {/* ============================================================ */}
      {/*  BACK LINK                                                    */}
      {/* ============================================================ */}
      <div className="bg-white border-b border-border-light">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-light transition-colors duration-200 hover:text-hydra-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  HEADER SECTION                                               */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hydra-50">
              <Icon
                className="h-8 w-8 text-hydra-600"
                strokeWidth={1.75}
              />
            </div>

            {/* Title */}
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">
              {service.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate sm:text-xl">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INFO CARDS — Frequency & Best For                            */}
      {/* ============================================================ */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-6">
            {/* Frequency */}
            <div className="flex items-start gap-4 rounded-2xl border border-border-light bg-white px-6 py-5 shadow-sm">
              <Clock
                className="mt-0.5 h-6 w-6 shrink-0 text-hydra-500"
                strokeWidth={1.75}
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-light">
                  Frequency
                </p>
                <p className="mt-1 text-base font-medium text-navy">
                  {service.frequency}
                </p>
              </div>
            </div>

            {/* Best For */}
            <div className="flex items-start gap-4 rounded-2xl border border-border-light bg-white px-6 py-5 shadow-sm">
              <Users
                className="mt-0.5 h-6 w-6 shrink-0 text-hydra-500"
                strokeWidth={1.75}
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-light">
                  Best For
                </p>
                <p className="mt-1 max-w-sm text-base font-medium text-navy">
                  {service.bestFor}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHAT'S INCLUDED — Checklist                                  */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-navy md:text-3xl">
              What&apos;s Included
            </h2>

            <ul className="mt-8 flex flex-col gap-4">
              {service.checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-relaxed text-slate"
                >
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-hydra-500"
                    strokeWidth={2}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-20 border-t border-border-light">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-navy md:text-3xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-light">
              Get a free, no-obligation quote for {service.title.toLowerCase()}{" "}
              and we&apos;ll take it from there.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-hydra-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-hydra-500/25 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-hydra-500/30 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-hydra-500 focus-visible:ring-offset-2"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  RELATED ARTICLES                                             */}
      {/* ============================================================ */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-t border-border-light">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy md:text-3xl">
              Related Articles
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group rounded-2xl border border-border-light bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-hydra-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-light">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "Recent"}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-navy transition-colors duration-200 group-hover:text-hydra-600">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">
                    {post.excerpt}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-hydra-600">
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
