"use client";

import { useState, type ReactNode } from "react";

type FileId =
  | "readme"
  | "linkedin"
  | "instagram"
  | "discord"
  | "x"
  | "sophon";

type FileRecord = {
  id: FileId;
  name: string;
  path: string;
  branch: string;
  type: string;
};

type FileGroup = {
  name: string;
  branch: string;
  children: FileRecord[];
};

const readmeFile: FileRecord = {
  id: "readme",
  name: "README.md",
  path: "~/rangan39/README.md",
  branch: "├──",
  type: "md",
};

const groups: FileGroup[] = [
  {
    name: "work/",
    branch: "├──",
    children: [
      {
        id: "linkedin",
        name: "linkedin.link",
        path: "~/rangan39/work/linkedin.link",
        branch: "│   └──",
        type: "link",
      },
    ],
  },
  {
    name: "contact/",
    branch: "├──",
    children: [
      {
        id: "instagram",
        name: "instagram.link",
        path: "~/rangan39/contact/instagram.link",
        branch: "│   ├──",
        type: "link",
      },
      {
        id: "discord",
        name: "discord.txt",
        path: "~/rangan39/contact/discord.txt",
        branch: "│   ├──",
        type: "txt",
      },
      {
        id: "x",
        name: "x.link",
        path: "~/rangan39/contact/x.link",
        branch: "│   └──",
        type: "link",
      },
    ],
  },
  {
    name: "oss/",
    branch: "└──",
    children: [
      {
        id: "sophon",
        name: "sophon/",
        path: "~/rangan39/oss/sophon",
        branch: "    └──",
        type: "dir",
      },
    ],
  },
];

const files = [readmeFile, ...groups.flatMap((group) => group.children)];

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

function openTreeFile(file: FileId) {
  document.querySelector<HTMLButtonElement>(`[data-file="${file}"]`)?.click();
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
          onClick={() => openTreeFile("linkedin")}
        >
          ./work
        </button>
        {"  "}
        <button
          type="button"
          className="inline-command"
          onClick={() => openTreeFile("instagram")}
        >
          ./contact
        </button>
        {"  "}
        <button
          type="button"
          className="inline-command"
          onClick={() => openTreeFile("sophon")}
        >
          ./oss
        </button>
      </Line>
    </>
  );
}

function LinkedIn() {
  return (
    <>
      <Line number={1}>
        <span className="syntax-comment">{"// work identity"}</span>
      </Line>
      <Line number={2} />
      <Line number={3}>
        name<span className="syntax-dim">.......</span>gaurav ranganath
      </Line>
      <Line number={4}>
        network<span className="syntax-dim">....</span>linkedin
      </Line>
      <Line number={5}>
        signal<span className="syntax-dim">.....</span>
        <span className="syntax-signal">connected</span>
      </Line>
      <Line number={6} />
      <Line number={7}>
        <a
          className="inline-link"
          href="https://www.linkedin.com/in/gaurav-ranganath/"
          target="_blank"
          rel="noreferrer"
        >
          → open linkedin↗
        </a>
      </Line>
    </>
  );
}

function Instagram() {
  return (
    <>
      <Line number={1}>
        <span className="syntax-comment">{"// visual channel"}</span>
      </Line>
      <Line number={2} />
      <Line number={3}>
        network<span className="syntax-dim">....</span>instagram
      </Line>
      <Line number={4}>
        handle<span className="syntax-dim">.....</span>@gauravranganath
      </Line>
      <Line number={5} />
      <Line number={6}>
        <a
          className="inline-link"
          href="https://www.instagram.com/gauravranganath/"
          target="_blank"
          rel="noreferrer"
        >
          → open instagram↗
        </a>
      </Line>
    </>
  );
}

function Discord() {
  const [copied, setCopied] = useState(false);

  async function copyHandle() {
    await navigator.clipboard?.writeText("gauravranganath");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
      <Line number={1}>
        <span className="syntax-comment">{"// direct channel"}</span>
      </Line>
      <Line number={2} />
      <Line number={3}>
        network<span className="syntax-dim">....</span>discord
      </Line>
      <Line number={4}>
        username<span className="syntax-dim">...</span>gauravranganath
      </Line>
      <Line number={5} />
      <Line number={6}>
        <button type="button" className="inline-command" onClick={copyHandle}>
          → {copied ? "copied to clipboard" : "copy username"}
        </button>
      </Line>
    </>
  );
}

function XProfile() {
  return (
    <>
      <Line number={1}>
        <span className="syntax-comment">{"// public feed"}</span>
      </Line>
      <Line number={2} />
      <Line number={3}>
        network<span className="syntax-dim">....</span>x
      </Line>
      <Line number={4}>
        handle<span className="syntax-dim">.....</span>@ranganath92929
      </Line>
      <Line number={5} />
      <Line number={6}>
        <a
          className="inline-link"
          href="https://x.com/ranganath92929"
          target="_blank"
          rel="noreferrer"
        >
          → open x↗
        </a>
      </Line>
    </>
  );
}

function Sophon() {
  return (
    <>
      <Line number={1}>
        <span className="syntax-comment">{"// open source transmission"}</span>
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
          → repository↗
        </a>
      </Line>
      <Line number={8}>
        <a
          className="inline-link"
          href="https://sophon-coral.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          → live build↗
        </a>
      </Line>
    </>
  );
}

const fileContents: Record<FileId, ReactNode> = {
  readme: <Readme />,
  linkedin: <LinkedIn />,
  instagram: <Instagram />,
  discord: <Discord />,
  x: <XProfile />,
  sophon: <Sophon />,
};

const lineCounts: Record<FileId, number> = {
  readme: 8,
  linkedin: 7,
  instagram: 6,
  discord: 6,
  x: 6,
  sophon: 8,
};

export function PortfolioExplorer() {
  const [activeId, setActiveId] = useState<FileId>("readme");
  const activeFile = files.find((file) => file.id === activeId) ?? readmeFile;

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
            <button
              type="button"
              data-file={readmeFile.id}
              onClick={() => setActiveId(readmeFile.id)}
              aria-pressed={activeId === readmeFile.id}
              className="tree-entry"
            >
              <span className="tree-branch" aria-hidden="true">
                {readmeFile.branch}
              </span>
              <span>{readmeFile.name}</span>
            </button>

            {groups.map((group) => {
              const groupIsActive = group.children.some(
                (file) => file.id === activeId,
              );

              return (
                <div key={group.name} className="tree-group">
                  <button
                    type="button"
                    className="tree-folder"
                    data-active={groupIsActive}
                    onClick={() => setActiveId(group.children[0].id)}
                    aria-label={`Open ${group.name}`}
                  >
                    <span className="tree-branch" aria-hidden="true">
                      {group.branch}
                    </span>
                    <span className="directory">{group.name}</span>
                  </button>
                  {group.children.map((file) => (
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
                      <span
                        className={file.type === "dir" ? "directory" : undefined}
                      >
                        {file.name}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })}
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
            <span>ln {String(lineCounts[activeId]).padStart(2, "0")}</span>
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
