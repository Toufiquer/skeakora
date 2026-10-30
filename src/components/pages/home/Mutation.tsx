/*
|-----------------------------------------
| setting up Mutation.tsx for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 31 October, 2026
|-----------------------------------------
*/

"use client";

import Image from "next/image";
import { useState } from "react";

import ImagePickerModal from "@/components/dashboard-ui/ImagePickerModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { defaultData, homeValues, parseHomeCards, type HomeData } from "./data";

export default function Mutation({ data, onChange }: { data?: Partial<HomeData>; onChange: (data: HomeData) => void }) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const values = homeValues(data);
  const sections = parseHomeCards(values.sectionsJson);
  const pages = Math.ceil(sections.length / pageSize);
  const update = (next: Partial<HomeData>) => onChange({ ...values, ...next });
  const updateSection = (index: number, field: "title" | "description", value: string) => {
    const next = sections.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    update({ sectionsJson: JSON.stringify(next) });
  };
  const buttonClass = "cursor-pointer bg-amber-100 text-amber-900 transition duration-700 hover:bg-amber-200";
  return (
    <div className="custom-parent-border bg-[#fffaf0] text-stone-800">
      <div className="mx-auto max-w-7xl p-4 sm:p-5">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-[#eadfca] bg-white p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-amber-700">Page editor</p>
            <h2 className="mt-1 text-xl font-semibold">Speakora homepage</h2>
            <p className="mt-1 text-sm text-stone-500">Edit the hero and the eleven fixed sections below.</p>
          </div>
          <label className="flex items-center gap-3 text-sm font-medium">
            Force update{" "}
            <Switch
              checked={values.forceUpdate === "true"}
              onCheckedChange={(checked) => update({ forceUpdate: checked ? "true" : "false" })}
            />
          </label>
        </header>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_19rem]">
          <div className="grid gap-4 rounded-sm border border-[#eadfca] bg-white p-4">
            <h3 className="font-semibold">Hero content</h3>
            <Field label="Eyebrow" value={values.eyebrow} onChange={(eyebrow) => update({ eyebrow })} />
            <Field label="Title" value={values.title} onChange={(title) => update({ title })} />
            <label className="grid gap-1.5 text-sm font-medium">
              Introduction
              <Textarea value={values.intro} onChange={(event) => update({ intro: event.target.value })} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["paddingX", "paddingY"] as const).map((key) => (
                <label className="grid gap-2 text-sm" key={key}>
                  {key === "paddingX" ? "Horizontal" : "Vertical"} padding: {values[key]}px
                  <Slider
                    min={0}
                    max={300}
                    step={1}
                    value={[Number(values[key]) || 0]}
                    onValueChange={([value]) => update({ [key]: value ?? 0 })}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-[#eadfca] bg-white p-4">
            <h3 className="font-semibold">Hero image</h3>
            <Image
              alt={values.imageAlt || defaultData.imageAlt}
              className="mt-3 aspect-[4/3] w-full object-cover"
              width={600}
              height={450}
              src={values.imageUrl || defaultData.imageUrl}
              unoptimized
            />
            <Button className={`${buttonClass} mt-3 w-full`} size="sm" onClick={() => setMediaOpen(true)}>
              Edit image
            </Button>
            <div className="mt-3">
              <Field label="Image alt text" value={values.imageAlt} onChange={(imageAlt) => update({ imageAlt })} />
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-sm border border-[#eadfca] bg-white p-4">
          <h3 className="font-semibold">Page sections</h3>
          <p className="mt-1 text-sm text-stone-500">
            The layout contains exactly eleven sections after the hero. Edit their headings and descriptions here.
          </p>
          <div className="mt-4 grid gap-3">
            {sections.slice((page - 1) * pageSize, page * pageSize).map((card, offset) => {
              const index = (page - 1) * pageSize + offset;
              return (
                <details className="rounded-sm border border-[#eadfca] bg-[#fffdf8] p-4" key={index}>
                  <summary className="cursor-pointer font-medium">
                    <span className="mr-3 text-amber-700">{String(index + 2).padStart(2, "0")}</span>
                    {card.title}
                  </summary>
                  <div className="mt-4 grid gap-3">
                    <Field
                      label="Section title"
                      value={card.title}
                      onChange={(value) => updateSection(index, "title", value)}
                    />
                    <label className="grid gap-1.5 text-sm font-medium">
                      Section description
                      <Textarea
                        value={card.description}
                        onChange={(event) => updateSection(index, "description", event.target.value)}
                      />
                    </label>
                  </div>
                </details>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              Items per page
              <Select
                value={String(pageSize)}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger aria-label="Items per page" className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 25, 50, 100].map((n) => (
                    <SelectItem value={String(n)} key={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button className={buttonClass} size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <span>
                Page {page} of {pages}
              </span>
              <Button className={buttonClass} size="sm" disabled={page >= pages} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      {mediaOpen && (
        <ImagePickerModal
          close={() => setMediaOpen(false)}
          description="Select or upload a homepage image."
          onSelect={(imageUrl) => {
            update({ imageUrl });
            setMediaOpen(false);
          }}
          title="Choose hero image"
          uploadLabel="Upload image"
        />
      )}
    </div>
  );
}
function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
