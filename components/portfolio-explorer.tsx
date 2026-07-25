"use client";

import { useMemo, useState, type ComponentType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  ExternalLink,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  Grid2X2,
  Home,
  List,
  Search,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type EntryId = "readme" | "sophon" | "stack" | "contact";

type FileEntry = {
  id: EntryId;
  name: string;
  kind: string;
  modified: string;
  size: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  iconClass: string;
  label: string;
  title: string;
  description: string;
  detail: string;
  tags: string[];
  action?: {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  };
};

const entries: FileEntry[] = [
  {
    id: "readme",
    name: "README.md",
    kind: "Markdown",
    modified: "Today",
    size: "2 KB",
    icon: FileText,
    iconClass: "text-[#4b83ff]",
    label: "Independent product studio",
    title: "Building useful, considered software.",
    description:
      "I’m rangan39 — an independent builder focused on turning early ideas into clear, reliable digital products.",
    detail:
      "I work across product thinking, interface design, and engineering. The goal is simple: make complex things feel obvious.",
    tags: ["Product", "Design", "Engineering"],
    action: {
      label: "View GitHub",
      href: "https://github.com/rangan39",
      icon: GitBranch,
    },
  },
  {
    id: "sophon",
    name: "sophon",
    kind: "Folder",
    modified: "Jul 25, 2026",
    size: "—",
    icon: Folder,
    iconClass: "text-[#d7a92b] fill-[#f5cf57]",
    label: "Selected work / 01",
    title: "sophon",
    description:
      "A public TypeScript project in active development, shaped through fast experiments and careful iteration.",
    detail:
      "Open the repository to explore the code, follow progress, and see the latest release of the project.",
    tags: ["TypeScript", "Open source", "Active"],
    action: {
      label: "Open repository",
      href: "https://github.com/rangan39/sophon",
      icon: ExternalLink,
    },
  },
  {
    id: "stack",
    name: "stack.json",
    kind: "JSON",
    modified: "Jul 25, 2026",
    size: "1 KB",
    icon: FileJson,
    iconClass: "text-[#8a5cf5]",
    label: "Tools / current",
    title: "A modern, dependable stack.",
    description:
      "I choose tools that keep the feedback loop fast without making the finished product fragile.",
    detail:
      "This portfolio uses the same approach: a modern React foundation, small composable components, and production-first deployment.",
    tags: ["Next.js 16", "TypeScript", "shadcn/ui", "Tailwind", "Vercel"],
    action: {
      label: "Browse code",
      href: "https://github.com/rangan39",
      icon: Code2,
    },
  },
  {
    id: "contact",
    name: "contact.txt",
    kind: "Text",
    modified: "Today",
    size: "1 KB",
    icon: FileCode2,
    iconClass: "text-[#35a86b]",
    label: "Contact / online",
    title: "Have an interesting problem?",
    description:
      "I’m open to thoughtful product collaborations, focused engineering work, and conversations about useful software.",
    detail:
      "The simplest way to start is through GitHub. Share a little context and I’ll take it from there.",
    tags: ["Available", "Toronto / remote"],
    action: {
      label: "Start on GitHub",
      href: "https://github.com/rangan39",
      icon: Send,
    },
  },
];

const navigation = [
  { id: "readme" as const, label: "About", icon: UserRound },
  { id: "sophon" as const, label: "Work", icon: BriefcaseBusiness },
  { id: "stack" as const, label: "Stack", icon: Code2 },
  { id: "contact" as const, label: "Contact", icon: Send },
];

export function PortfolioExplorer() {
  const [activeId, setActiveId] = useState<EntryId>("readme");
  const activeEntry = useMemo(
    () => entries.find((entry) => entry.id === activeId) ?? entries[0],
    [activeId],
  );
  const ActiveIcon = activeEntry.icon;
  const ActionIcon = activeEntry.action?.icon;

  return (
    <main className="portfolio-shell">
      <section
        className="file-window flex flex-col"
        aria-label="rangan39 portfolio file browser"
      >
        <header className="relative flex h-11 shrink-0 items-center border-b border-line bg-[#efefec] px-3 sm:px-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff6158]" />
            <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-xs font-medium text-[#666661]">
            portfolio — File Browser
          </div>
          <Badge
            variant="outline"
            className="ml-auto hidden border-[#d3d3ce] bg-[#f7f7f4] sm:inline-flex"
          >
            <span className="size-1.5 rounded-full bg-[#28a85d]" />
            Available
          </Badge>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <aside className="flex w-full shrink-0 flex-col border-b border-line bg-[#f0f0ed] p-2.5 lg:w-52 lg:border-r lg:border-b-0 lg:p-3">
            <div className="hidden px-2 pb-3 pt-1 lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Workspace
              </p>
              <p className="mt-1 text-sm font-semibold">rangan39</p>
            </div>

            <nav
              className="flex gap-1 overflow-x-auto lg:block lg:space-y-0.5"
              aria-label="Portfolio folders"
            >
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeId;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/35 lg:w-full",
                      isActive
                        ? "bg-[#deded9] text-foreground"
                        : "text-[#696964] hover:bg-[#e7e7e3] hover:text-foreground",
                    )}
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 hidden lg:block">
              <p className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Places
              </p>
              <a
                href="https://github.com/rangan39"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-[#696964] outline-none transition-colors hover:bg-[#e7e7e3] hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/35"
              >
                <GitBranch className="size-3.5" aria-hidden />
                GitHub
                <ExternalLink
                  className="ml-auto size-3 text-[#9a9a94]"
                  aria-hidden
                />
              </a>
            </div>

            <div className="mt-auto hidden pt-10 lg:block">
              <div className="rounded-lg border border-[#ddddda] bg-[#f6f6f3] p-3">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <CircleDot className="size-3.5 text-[#28a85d]" aria-hidden />
                  Open to work
                </div>
                <p className="mt-1.5 text-[11px] leading-4 text-muted">
                  Product, interface, and engineering collaborations.
                </p>
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col bg-panel-strong">
            <div className="flex h-12 shrink-0 items-center gap-1 border-b border-line px-2.5 sm:px-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Back"
                disabled
                className="size-7"
              >
                <ArrowLeft className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Forward"
                disabled
                className="size-7"
              >
                <ArrowRight className="size-3.5" />
              </Button>

              <div className="ml-1 flex min-w-0 items-center gap-1.5 text-xs text-muted">
                <Home className="size-3.5 shrink-0" aria-hidden />
                <ChevronRight
                  className="size-3 shrink-0 text-[#b4b4ae]"
                  aria-hidden
                />
                <span className="truncate">rangan39</span>
                <ChevronRight
                  className="size-3 shrink-0 text-[#b4b4ae]"
                  aria-hidden
                />
                <span className="truncate font-medium text-foreground">
                  portfolio
                </span>
              </div>

              <div className="ml-auto flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Search on GitHub"
                  className="size-7"
                  asChild
                >
                  <a
                    href="https://github.com/rangan39"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Search className="size-3.5" />
                  </a>
                </Button>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="List view"
                  className="size-7 bg-[#eeeeea] text-foreground"
                >
                  <List className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Grid view"
                  className="size-7"
                  disabled
                >
                  <Grid2X2 className="size-3.5" />
                </Button>
              </div>
            </div>

            <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(420px,1.08fr)_minmax(360px,0.92fr)]">
              <section className="min-w-0 border-b border-line lg:border-r lg:border-b-0">
                <div className="file-list-grid h-9 border-b border-line bg-[#fafaf8] px-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#969690]">
                  <span />
                  <span>Name</span>
                  <span>Modified</span>
                  <span>Size</span>
                </div>

                <div className="px-1 py-1.5">
                  {entries.map((entry) => {
                    const Icon = entry.icon;
                    const isActive = entry.id === activeId;

                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => setActiveId(entry.id)}
                        aria-pressed={isActive}
                        className="file-row file-list-grid min-h-11 w-full px-3 text-left text-xs outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/35"
                      >
                        <Icon
                          className={cn("size-[18px]", entry.iconClass)}
                          aria-hidden
                        />
                        <span className="truncate font-medium text-[#343431]">
                          {entry.name}
                        </span>
                        <span className="text-[#878781]">{entry.modified}</span>
                        <span className="text-[#878781]">{entry.size}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mx-4 mt-8 rounded-xl border border-dashed border-[#d6d6d0] bg-[#fafaf8] p-4 sm:mx-5 sm:mt-12">
                  <div className="flex items-center gap-2">
                    <FolderOpen
                      className="size-4 text-[#c39925]"
                      aria-hidden
                    />
                    <p className="text-xs font-semibold">
                      A small, honest directory
                    </p>
                  </div>
                  <p className="mt-2 max-w-md text-xs leading-5 text-muted">
                    No sprawling case-study maze. Just the work, the tools behind
                    it, and a clear way to connect.
                  </p>
                </div>
              </section>

              <aside
                className="preview-grid flex min-h-[430px] flex-col bg-[#f7f7f4]"
                aria-live="polite"
              >
                <div className="flex h-9 items-center border-b border-line bg-[#fafaf8]/90 px-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    Preview
                  </p>
                  <Badge
                    variant="secondary"
                    className="ml-auto rounded-md font-mono text-[9px] uppercase"
                  >
                    {activeEntry.kind}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-8 lg:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={cn(
                        "flex size-14 items-center justify-center rounded-xl border border-[#deded8] bg-white shadow-sm",
                        activeEntry.id === "readme" && "rotate-[-2deg]",
                      )}
                    >
                      <ActiveIcon
                        className={cn("size-7", activeEntry.iconClass)}
                        aria-hidden
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[#999992]">
                      0{entries.findIndex((entry) => entry.id === activeId) + 1}
                      /04
                    </span>
                  </div>

                  <div className="mt-10 max-w-xl">
                    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-accent">
                      {activeEntry.label}
                    </p>
                    <h1 className="mt-3 max-w-lg text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#20201e]">
                      {activeEntry.title}
                    </h1>
                    <p className="mt-5 max-w-lg text-sm leading-6 text-[#555550] sm:text-[15px]">
                      {activeEntry.description}
                    </p>
                    <p className="mt-3 max-w-lg text-xs leading-5 text-[#83837d] sm:text-sm sm:leading-6">
                      {activeEntry.detail}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-1.5">
                    {activeEntry.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag === "Available" && (
                          <Check
                            className="size-2.5 text-[#28a85d]"
                            aria-hidden
                          />
                        )}
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
                    {activeEntry.action && ActionIcon && (
                      <Button asChild>
                        <a
                          href={activeEntry.action.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ActionIcon className="size-3.5" aria-hidden />
                          {activeEntry.action.label}
                        </a>
                      </Button>
                    )}
                    <div className="flex items-center gap-1.5 text-[11px] text-muted">
                      <Sparkles
                        className="size-3 text-[#c39925]"
                        aria-hidden
                      />
                      Built with care
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <footer className="flex h-7 shrink-0 items-center border-t border-line bg-[#f0f0ed] px-3 text-[10px] text-[#797973]">
              <span>4 items</span>
              <span className="mx-2 text-[#b8b8b2]">•</span>
              <span>1 selected</span>
              <span className="ml-auto hidden items-center gap-1.5 sm:flex">
                <span className="size-1.5 rounded-full bg-[#28a85d]" />
                Next.js 16 · shadcn/ui
              </span>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
