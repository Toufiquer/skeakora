/*
|-----------------------------------------
| setting up Query.tsx for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 31 October, 2026
|-----------------------------------------
*/

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";

import { courses, defaultData, faqs, homeValues, parseHomeCards, type HomeData } from "./data";

const wrap = "mx-auto max-w-7xl px-5 sm:px-8";
const heading = "text-3xl font-semibold tracking-[-0.04em] leading-[1.1] sm:text-5xl lg:text-6xl";
const eyebrow = "text-xs font-bold uppercase tracking-[.2em] text-[#3656e8]";
const copy = "text-base leading-7 text-slate-600 sm:text-lg sm:leading-8";
const cta = `${buttonVariants({ size: "sm" })} h-11 cursor-pointer rounded-sm bg-amber-300 px-5 text-sm font-semibold text-[#071946] transition duration-700 hover:-translate-y-0.5 hover:bg-amber-200`;
const secondary = `${buttonVariants({ size: "sm", variant: "outline" })} h-11 cursor-pointer rounded-sm border-[#c9d2ef] bg-white px-5 text-sm font-semibold text-[#071946] transition duration-700 hover:-translate-y-0.5 hover:bg-blue-50`;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-sm ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        unoptimized={!src.startsWith("/")}
        className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
      />
    </div>
  );
}
function SectionTitle({
  number,
  label,
  title,
  description,
  light = false,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  light?: boolean;
}) {
  return (
    <Reveal>
      <p className={light ? "text-xs font-bold uppercase tracking-[.2em] text-blue-200" : eyebrow}>
        {number} / {label}
      </p>
      <h2 className={`${heading} mt-4`}>{title}</h2>
      <p
        className={`${light ? "text-blue-100/80" : "text-slate-600"} mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8`}
      >
        {description}
      </p>
    </Reveal>
  );
}
function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <a
      href={href}
      className={`group mt-6 inline-flex items-center gap-3 text-sm font-bold transition duration-700 ${light ? "text-white" : "text-[#304fe0]"}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-700 group-hover:translate-x-1">
        ↗
      </span>
    </a>
  );
}
export default function Query({ data }: { data?: Partial<HomeData> }) {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroOffset = useTransform(scrollY, [0, 800], [0, 55]);
  const values = homeValues(data);
  const sections = parseHomeCards(values.sectionsJson);
  const paddingX = Math.min(300, Math.max(0, Number(values.paddingX) || 0));
  const paddingY = Math.min(300, Math.max(0, Number(values.paddingY) || 0));
  return (
    <div
      className="custom-parent-border overflow-hidden bg-[#fffdf9] text-[#071946]"
      style={{ paddingInline: paddingX, paddingBlock: paddingY }}
    >
      {/* 01 — Hero */}
      <section className="relative isolate overflow-hidden bg-[#f4f7ff]">
        <div
          aria-hidden="true"
          className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl motion-safe:animate-pulse"
        />
        <div
          className={`${wrap} relative grid items-center gap-10 py-16 sm:py-24 lg:min-h-[720px] lg:grid-cols-[1fr_1fr] lg:gap-16`}
        >
          <div className="relative z-10">
            <Reveal>
              <p className={eyebrow}>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#7637ff]" />
                {values.eyebrow || defaultData.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-7xl xl:text-[5.4rem]">
                {values.title || defaultData.title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className={`${copy} mt-6 max-w-lg`}>{values.intro || defaultData.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#courses" className={cta}>
                  Explore Courses <span aria-hidden="true">↗</span>
                </a>
                <Link href="/contact-us" className={secondary}>
                  Book a Consultation
                </Link>
              </div>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[.16em] text-slate-500">
                IELTS &nbsp; / &nbsp; Everyday English &nbsp; / &nbsp; Professional English
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="relative pb-8 pl-5 sm:pl-10">
            <motion.div style={{ y: reducedMotion ? 0 : heroOffset }}>
              <div className="absolute inset-x-0 bottom-0 top-10 rotate-3 rounded-sm bg-gradient-to-br from-[#04a3ff] via-[#255bfa] to-[#7623f9]" />
              <Photo
                src={values.imageUrl || defaultData.imageUrl}
                alt={values.imageAlt || defaultData.imageAlt}
                priority
                className="aspect-[4/4.4] shadow-2xl shadow-blue-900/20"
              />
              <motion.div
                animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-1 top-12 rounded-sm border border-white/80 bg-white/95 px-4 py-3 shadow-xl sm:-left-4"
              >
                <span className="text-xs text-slate-500">A little practice,</span>
                <p className="font-semibold text-[#173fe2]">a lot more confidence ✳</p>
              </motion.div>
              <div className="absolute bottom-0 right-4 rounded-sm bg-[#081b4b] px-5 py-4 text-white shadow-xl">
                <p className="text-xs uppercase tracking-[.16em] text-blue-200">Your voice matters</p>
                <p className="mt-1 text-lg font-semibold">Let’s make it heard.</p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
      {/* 02 — Courses */}
      <section id="courses" className="scroll-mt-8 bg-white py-20 sm:py-28">
        <div className={wrap}>
          <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:items-end">
            <SectionTitle number="02" label="Explore our courses" {...sections[0]} />
            <Reveal className="md:justify-self-end">
              <p className="max-w-xs text-sm leading-6 text-slate-500">
                A learning journey shaped around the life you want to lead.
              </p>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {courses.map((course, index) => (
              <Reveal key={course.title} delay={index * 0.06}>
                <a
                  href={`#${course.target}`}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                  <Photo
                    src={course.image}
                    alt=""
                    className="aspect-[4/5] bg-blue-100 transition duration-700 motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:shadow-xl"
                  />
                  <div className="mt-4 flex justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#5267c9]">{course.label}</p>
                      <h3 className="mt-2 text-lg font-semibold leading-tight">{course.title}</h3>
                    </div>
                    <span
                      className="text-xl text-blue-600 transition duration-700 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 03 — Speaking */}
      <section id="ielts-speaking" className="scroll-mt-8 bg-[#edf2ff] py-20 sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
          <Reveal className="relative pr-8 pb-8">
            <Photo
              src="/images/speakora/group.jpg"
              alt="People sharing a conversation together"
              className="aspect-[5/4]"
            />
            <div className="absolute bottom-0 right-0 max-w-[190px] bg-[#173dd4] p-5 text-white shadow-xl">
              <p className="text-3xl">“ ”</p>
              <p className="mt-1 text-sm font-semibold">Ideas become powerful when you give them a voice.</p>
            </div>
          </Reveal>
          <div>
            <SectionTitle number="03" label="IELTS speaking mastery" {...sections[1]} />
            <div className="mt-8 grid gap-4 border-t border-[#cdd8f3] pt-6 sm:grid-cols-2">
              <p className="text-sm font-semibold">01 &nbsp; Express your ideas</p>
              <p className="text-sm font-semibold">02 &nbsp; Practice speaking clearly</p>
            </div>
            <TextLink href="#start">Ask about IELTS Speaking</TextLink>
          </div>
        </div>
      </section>
      {/* 04 — IELTS */}
      <section id="ielts" className="scroll-mt-8 bg-[#081a49] py-20 text-white sm:py-28">
        <div className={wrap}>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <SectionTitle number="04" label="Complete IELTS preparation" {...sections[2]} light />
            <Reveal className="relative">
              <Photo
                src="/images/speakora/study.jpg"
                alt="A learner writing notes while studying"
                className="aspect-[16/9]"
              />
              <span className="absolute -bottom-4 left-5 bg-[#7637ff] px-4 py-2 text-xs font-bold uppercase tracking-wider">
                Four skills, one journey
              </span>
            </Reveal>
          </div>
          <div className="mt-12 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Listening", "Tune in to meaning."],
              ["02", "Reading", "Read with purpose."],
              ["03", "Writing", "Organize your ideas."],
              ["04", "Speaking", "Say it confidently."],
            ].map(([n, title, desc]) => (
              <Reveal key={title}>
                <div className="group border-b border-white/20 py-6 pr-6 transition duration-700 hover:translate-x-1">
                  <span className="text-xs text-blue-300">{n} /</span>
                  <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-blue-100/70">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 05 — Kids */}
      <section id="kids" className="scroll-mt-8 overflow-hidden bg-[#fff8e9] py-20 sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
          <div>
            <SectionTitle number="05" label="Spoken English for kids" {...sections[3]} />
            <div className="mt-8 flex flex-wrap gap-2">
              {["Curiosity", "Conversation", "Confidence"].map((word) => (
                <span
                  key={word}
                  className="rounded-sm border border-[#eadfca] bg-white px-4 py-2 text-sm font-semibold text-[#3353d5]"
                >
                  ✳ &nbsp; {word}
                </span>
              ))}
            </div>
            <TextLink href="#start">Explore learning for kids</TextLink>
          </div>
          <Reveal className="relative px-6">
            <div aria-hidden="true" className="absolute inset-0 rotate-3 rounded-sm bg-[#ffe29d]" />
            <Photo
              src="/images/speakora/children.jpg"
              alt="A child enjoying a playful moment"
              className="aspect-[5/4]"
            />
            <span className="absolute -right-2 top-6 rotate-12 bg-[#6638ec] px-4 py-3 text-xl font-bold text-white">
              Aa!
            </span>
            <span className="absolute -left-2 bottom-5 -rotate-6 bg-white px-4 py-3 font-semibold text-[#173dd4] shadow-lg">
              Hello, world ✦
            </span>
          </Reveal>
        </div>
      </section>
      {/* 06 — Parents */}
      <section id="parents" className="scroll-mt-8 bg-white py-20 sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20`}>
          <Reveal className="grid grid-cols-[1fr_.65fr] items-end gap-3">
            <Photo src="/images/speakora/family.jpg" alt="A family sharing time together" className="aspect-[3/4]" />
            <div>
              <Photo
                src="/images/speakora/kids.jpg"
                alt="Books and colourful alphabet blocks"
                className="aspect-square"
              />
              <p className="mt-4 text-sm font-medium leading-6 text-slate-500">
                For the conversations that bring us closer.
              </p>
            </div>
          </Reveal>
          <div>
            <SectionTitle number="06" label="Spoken English for parents" {...sections[4]} />
            <TextLink href="#start">Discover English for parents</TextLink>
          </div>
        </div>
      </section>
      {/* 07 — Executive */}
      <section id="executive" className="scroll-mt-8 bg-[#f0f3fa] py-20 sm:py-28">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center`}>
          <div>
            <SectionTitle number="07" label="Executive spoken English" {...sections[5]} />
            <div className="mt-8 space-y-3 border-t border-[#cbd3e5] pt-5 text-sm font-semibold">
              <p>↗ &nbsp; Meetings and discussions</p>
              <p>↗ &nbsp; Presentations and ideas</p>
              <p>↗ &nbsp; Professional conversations</p>
            </div>
            <TextLink href="#start">Explore executive English</TextLink>
          </div>
          <Reveal className="relative">
            <Photo
              src="/images/speakora/business.jpg"
              alt="Colleagues collaborating around a table"
              className="aspect-[6/4]"
            />
            <div className="absolute bottom-0 left-0 bg-[#071946] px-6 py-4 text-sm font-semibold text-white">
              Your ideas deserve to travel further. ↗
            </div>
          </Reveal>
        </div>
      </section>
      {/* 08 — Benefits */}
      <section className="bg-white py-20 sm:py-28">
        <div className={wrap}>
          <div className="max-w-3xl">
            <SectionTitle number="08" label="Why choose Speakora" {...sections[6]} />
          </div>
          <div className="mt-12 grid border-t border-[#eadfca] md:grid-cols-2 lg:grid-cols-4">
            {[
              ["✳", "Interactive lessons", "Engage with English in ways that invite participation."],
              ["◌", "Speaking practice", "Make space to put your words into practice."],
              ["↗", "Learning support", "Explore a learning path that fits your goals."],
              ["✦", "Everyday confidence", "Build skills for conversations that matter to you."],
            ].map(([icon, title, desc], i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="group border-b border-[#eadfca] py-7 pr-7 transition duration-700 hover:translate-y-[-4px]">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 place-items-center rounded-sm bg-[#eef1ff] text-2xl text-[#4e49ed]"
                  >
                    {icon}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 09 — Gallery */}
      <section className="bg-[#f5f7ff] py-20 sm:py-28">
        <div className={wrap}>
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <SectionTitle number="09" label="Our learning experience" {...sections[7]} />
            <p className="max-w-sm text-sm leading-6 text-slate-500 md:justify-self-end">
              A world of ideas, shared experiences and new possibilities.
            </p>
          </div>
          <Reveal className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Photo
              src="/images/speakora/classroom.jpg"
              alt="Students learning together in a classroom"
              className="col-span-2 row-span-2 min-h-[260px] md:min-h-[440px]"
            />
            <Photo src="/images/speakora/online.jpg" alt="People collaborating at a laptop" className="aspect-[4/3]" />
            <Photo
              src="/images/speakora/speaking.jpg"
              alt="Students studying together in a library"
              className="aspect-[4/3]"
            />
            <Photo src="/images/speakora/group.jpg" alt="People talking together" className="col-span-2 aspect-[2/1]" />
          </Reveal>
        </div>
      </section>
      {/* 10 — Stories: intentionally no invented testimonials */}
      <section className="bg-white py-20 sm:py-28">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center`}>
          <SectionTitle number="10" label="Student success stories" {...sections[8]} />
          <Reveal>
            <div className="relative border border-[#eadfca] bg-[#faf9ff] p-8 sm:p-12">
              <span aria-hidden="true" className="absolute right-8 top-4 text-8xl leading-none text-[#d9dfff]">
                “
              </span>
              <p className="relative text-xs font-bold uppercase tracking-[.2em] text-[#5267c9]">
                Real voices. Real journeys.
              </p>
              <p className="relative mt-6 max-w-md text-2xl font-medium leading-snug tracking-tight">
                A new language opens the door to a world of conversations.
              </p>
              <p className="mt-6 text-sm leading-6 text-slate-500">
                Learner stories will be featured with permission and verified feedback.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      {/* 11 — FAQ */}
      <section className="bg-[#f8f8fd] py-20 sm:py-28">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20`}>
          <SectionTitle number="11" label="Frequently asked questions" {...sections[9]} />
          <Reveal>
            <div className="border-t border-[#d8dff0]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-[#d8dff0]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-white text-xl text-blue-600 transition duration-700 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-xl pb-6 pr-8 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      {/* 12 — Final CTA */}
      <section
        id="start"
        className="relative isolate scroll-mt-8 overflow-hidden bg-[#071946] py-24 text-white sm:py-32"
      >
        <Image
          src="/images/speakora/students.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071946] via-[#132d8c]/90 to-[#5b27d5]/70" />
        <div className={`${wrap} relative`}>
          <div className="max-w-3xl">
            <SectionTitle number="12" label="Start your English journey" {...sections[10]} light />
            <Reveal>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className={cta} href="/contact-us">
                  Start Learning ↗
                </Link>
                <Link
                  className={`${secondary} border-white/40 bg-transparent text-white hover:bg-white hover:text-[#071946]`}
                  href="/contact-us"
                >
                  Contact Speakora
                </Link>
              </div>
            </Reveal>
          </div>
          <span
            aria-hidden="true"
            className="absolute right-8 top-0 hidden text-[12rem] font-semibold leading-none text-white/10 lg:block"
          >
            S.
          </span>
        </div>
      </section>
    </div>
  );
}
