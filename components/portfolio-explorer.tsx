"use client";

import { useState, type ReactNode } from "react";

type FileId = "readme" | "sophon" | "now" | "stack" | "contact";

type FileRecord = {
  id: FileId;
  name: string;
  path: string;
  branch: string;
  type: string;
};

const files: FileRecord[] = [
  {
    id: "readme",
    name: "README.md",
    path: "~/rangan39/README.md",
    branch: "├──",
    type: "md",
  },
  {
    id: "sophon",
    name: "sophon/",
    path: "~/rangan39/work/sophon",
    branch: "│   └──",
    type: "dir",
  },
  {
    id: "now",
    name: "now.txt",
    path: "~/rangan39/now.txt",
    branch: "├──",
    type: "txt",
  },
  {
    id: "stack",
    name: "stack.json",
    path: "~/rangan39/stack.json",
    branch: "├──",
    type: "json",
  },
  {
    id: "contact",
    name: "contact.txt",
    path: "~/rangan39/contact.txt",
    branch: "└──",
    type: "txt",
  },
];

function Line({
  number,
  children,
}: {
  number: number;
  children?: ReactNode;
}) {
  return (
    <div className="code-line">
      <span className="line-number" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>
      <span>{children ?? "\u00a0"}</span>
    </div>
  );
}

function Readme() {
  return (
    <>
      <Line number={1}>
        <span className="syntax-mark">#</span>{" "}
        <span className="syntax-title">rangan39</span>
      </Line>
      <Line number={2} />
      <Line number={3}>independent builder.</Line>
      <Line number={4}>small software / strange ideas / useful edges.</Line>
      <Line number={5} />
      <Line number={6}>
        currently: <span className="syntax-signal">shipping</span>
        <span className="cursor" aria-hidden="true" />
      </Line>
      <Line number={7} />
      <Line number={8}>
        <button
          type="button"
          className="inline-command"
          onClick={() =>
            document.querySelector<HTMLButtonElement>('[data-file="sophon"]')?.click()
          }
        >
          ./work
        </button>
        {"  "}
        <a
          className="inline-link"
          href="https://github.com/rangan39"
          target="_blank"
          rel="noreferrer"
        >
          ./source↗
        </a>
      </Line>
    </>
  );
}

function Sophon() {
  return (
    <>
      <Line number={1}>
        <span className="syntax-comment">{"// selected experiment"}</span>
      </Line>
      <Line number={2} />
      <Line number={3}>
        name<span className="syntax-dim">.....</span>sophon
      </Line>
      <Line number={4}>
        language<span className="syntax-dim">.</span>typescript
      </Line>
      <Line number={5}>
        state<span className="syntax-dim">....</span>
        <span className="syntax-signal">alive</span>
      </Line>
      <Line number={6} />
      <Line number={7}>
        <a
          className="inline-link"
          href="https://github.com/rangan39/sophon"
          target="_blank"
          rel="noreferrer"
        >
          → repository
        </a>
      </Line>
      <Line number={8}>
        <a
          className="inline-link"
          href="https://sophon-coral.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          → live build
        </a>
      </Line>
    </>
  );
}

function Now() {
  return (
    <>
      <Line number={1}>
        <span className="syntax-comment">[transmission 2026.07.25]</span>
      </Line>
      <Line number={2} />
      <Line number={3}>building in public.</Line>
      <Line number={4}>learning by shipping.</Line>
      <Line number={5}>keeping the surface area small.</Line>
      <Line number={6} />
      <Line number={7}>
        status: <span className="syntax-signal">online</span>
        <span className="cursor" aria-hidden="true" />
      </Line>
    </>
  );
}

function Stack() {
  return (
    <>
      <Line number={1}>{"{"}</Line>
      <Line number={2}>
        {"  "}
        <span className="syntax-key">&quot;system&quot;</span>:{" "}
        <span className="syntax-string">&quot;next.js&quot;</span>,
      </Line>
      <Line number={3}>
        {"  "}
        <span className="syntax-key">&quot;language&quot;</span>:{" "}
        <span className="syntax-string">&quot;typescript&quot;</span>,
      </Line>
      <Line number={4}>
        {"  "}
        <span className="syntax-key">&quot;interface&quot;</span>:{" "}
        <span className="syntax-string">&quot;shadcn/ui&quot;</span>,
      </Line>
      <Line number={5}>
        {"  "}
        <span className="syntax-key">&quot;ship&quot;</span>:{" "}
        <span className="syntax-string">&quot;vercel&quot;</span>,
      </Line>
      <Line number={6}>
        {"  "}
        <span className="syntax-key">&quot;rule&quot;</span>:{" "}
        <span className="syntax-string">&quot;less, but sharper&quot;</span>
      </Line>
      <Line number={7}>{"}"}</Line>
    </>
  );
}

function Contact() {
  return (
    <>
      <Line number={1}>
        <span className="syntax-comment"># establish signal</span>
      </Line>
      <Line number={2} />
      <Line number={3}>
        github:{" "}
        <a
          className="inline-link"
          href="https://github.com/rangan39"
          target="_blank"
          rel="noreferrer"
        >
          @rangan39↗
        </a>
      </Line>
      <Line number={4}>channel: async</Line>
      <Line number={5}>
        signal: <span className="syntax-signal">open</span>
      </Line>
    </>
  );
}

const fileContents: Record<FileId, ReactNode> = {
  readme: <Readme />,
  sophon: <Sophon />,
  now: <Now />,
  stack: <Stack />,
  contact: <Contact />,
};

export function PortfolioExplorer() {
  const [activeId, setActiveId] = useState<FileId>("readme");
  const activeFile = files.find((file) => file.id === activeId) ?? files[0];

  return (
    <main className="site-shell">
      <header className="site-header">
        <button
          type="button"
          className="site-mark"
          onClick={() => setActiveId("readme")}
          aria-label="Open README"
        >
          r39<span>/</span>
        </button>
        <span className="system-coordinate">node: 0x0027</span>
        <a
          className="header-link"
          href="https://github.com/rangan39"
          target="_blank"
          rel="noreferrer"
        >
          git↗
        </a>
      </header>

      <section className="filesystem" aria-label="rangan39 filesystem">
        <aside className="file-tree">
          <div className="tree-root">
            <span className="syntax-signal">~</span>/rangan39
          </div>
          <div className="tree-list">
            {files.map((file) => (
              <button
                key={file.id}
                type="button"
                data-file={file.id}
                onClick={() => setActiveId(file.id)}
                aria-pressed={activeId === file.id}
                className="tree-entry"
              >
                <span className="tree-branch" aria-hidden="true">
                  {file.branch}
                </span>
                <span className={file.type === "dir" ? "directory" : undefined}>
                  {file.name}
                </span>
              </button>
            ))}
          </div>
          <p className="tree-hint" aria-hidden="true">
            click a node
          </p>
        </aside>

        <section className="file-viewer" aria-live="polite">
          <div className="viewer-header">
            <span>{activeFile.path}</span>
            <span className="file-type">{activeFile.type}</span>
          </div>
          <div className="code-view">{fileContents[activeFile.id]}</div>
          <div className="viewer-status" aria-hidden="true">
            <span>utf-8</span>
            <span>ln {String(activeId === "readme" ? 8 : 7).padStart(2, "0")}</span>
            <span className="status-signal">
              <i />
              sync
            </span>
          </div>
        </section>
      </section>

      <footer className="site-footer">
        <span>
          sys<span className="syntax-dim">.</span>online
        </span>
        <span aria-hidden="true">∴</span>
        <span>2026</span>
      </footer>
    </main>
  );
}
