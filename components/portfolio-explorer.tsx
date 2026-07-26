"use client";

import { useEffect, useState, type ReactNode } from "react";

type FileId =
  | "about"
  | "github"
  | "linkedin"
  | "instagram"
  | "discord"
  | "x"
  | "sophon";

type GroupId = "work" | "contact" | "oss";

type FileRecord = {
  id: FileId;
  name: string;
  path: string;
  mode: string;
  meta: string;
  href?: string;
};

type FileGroup = {
  id: GroupId;
  name: string;
  meta: string;
  children: FileRecord[];
};

const aboutFile: FileRecord = {
  id: "about",
  name: "about.txt",
  path: "~/r39/about.txt",
  mode: "-rw",
  meta: "0.8k",
};

const githubFile: FileRecord = {
  id: "github",
  name: "github.url",
  path: "~/r39/github.url",
  mode: "-rw",
  meta: "link",
  href: "https://github.com/rangan39",
};

const groups: FileGroup[] = [
  {
    id: "work",
    name: "work/",
    meta: "1 item",
    children: [
      {
        id: "linkedin",
        name: "linkedin.url",
        path: "~/r39/work/linkedin.url",
        mode: "-rw",
        meta: "link",
        href: "https://www.linkedin.com/in/gaurav-ranganath/",
      },
    ],
  },
  {
    id: "contact",
    name: "contact/",
    meta: "3 items",
    children: [
      {
        id: "instagram",
        name: "instagram.url",
        path: "~/r39/contact/instagram.url",
        mode: "-rw",
        meta: "link",
        href: "https://www.instagram.com/gauravranganath/",
      },
      {
        id: "discord",
        name: "discord.txt",
        path: "~/r39/contact/discord.txt",
        mode: "-rw",
        meta: "0.1k",
      },
      {
        id: "x",
        name: "x.url",
        path: "~/r39/contact/x.url",
        mode: "-rw",
        meta: "link",
        href: "https://x.com/ranganath92929",
      },
    ],
  },
  {
    id: "oss",
    name: "oss/",
    meta: "1 item",
    children: [
      {
        id: "sophon",
        name: "sophon/",
        path: "~/r39/oss/sophon",
        mode: "drw",
        meta: "project",
        href: "https://github.com/rangan39/sophon",
      },
    ],
  },
];

const files = [
  aboutFile,
  githubFile,
  ...groups.flatMap((group) => group.children),
];

function getFile(id: FileId) {
  return files.find((file) => file.id === id) ?? aboutFile;
}

function ExternalAction({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="document-action" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function AboutDocument() {
  return (
    <>
      <p className="document-eyebrow">about.txt</p>
      <p className="document-lede">
        I work at Radical Ventures, where I build AI products for the firm.
      </p>
      <div className="document-copy">
        <p>
          I&apos;m interested in ML systems engineering, particularly model
          routing, agents, and local AI. I co-authored RouterBench, an open
          benchmark for multi-model routing, and I&apos;m currently working on
          Sophon, a local AI project that runs in the browser.
        </p>
        <p>
          This site is a collection of things I&apos;ve built and worked on.
        </p>
      </div>
    </>
  );
}

function LinkedInDocument() {
  return (
    <>
      <p className="document-eyebrow">work / external record</p>
      <h2>LinkedIn</h2>
      <p className="document-lede">The professional trail.</p>
      <dl className="document-record">
        <div>
          <dt>network</dt>
          <dd>linkedin</dd>
        </div>
        <div>
          <dt>record</dt>
          <dd>public profile</dd>
        </div>
      </dl>
      <ExternalAction href="https://www.linkedin.com/in/gaurav-ranganath/">
        open linkedin
      </ExternalAction>
    </>
  );
}

function InstagramDocument() {
  return (
    <>
      <p className="document-eyebrow">contact / visual channel</p>
      <h2>Instagram</h2>
      <p className="document-lede">@gauravranganath</p>
      <div className="document-copy">
        <p>Images, fragments, and whatever is happening off-screen.</p>
      </div>
      <ExternalAction href="https://www.instagram.com/gauravranganath/">
        open instagram
      </ExternalAction>
    </>
  );
}

function DiscordDocument({
  copied,
  copyHandle,
}: {
  copied: boolean;
  copyHandle: () => Promise<void>;
}) {
  return (
    <>
      <p className="document-eyebrow">contact / direct channel</p>
      <h2>Discord</h2>
      <p className="document-lede">gauravranganath</p>
      <div className="document-copy">
        <p>A direct line. Copy the username and send a signal.</p>
      </div>
      <button type="button" className="document-action" onClick={copyHandle}>
        <span>{copied ? "username copied" : "copy username"}</span>
        <span aria-hidden="true">{copied ? "✓" : "＋"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Discord username copied to clipboard." : ""}
      </span>
    </>
  );
}

function XDocument() {
  return (
    <>
      <p className="document-eyebrow">contact / public feed</p>
      <h2>X</h2>
      <p className="document-lede">@ranganath92929</p>
      <div className="document-copy">
        <p>Notes from the build, in public.</p>
      </div>
      <ExternalAction href="https://x.com/ranganath92929">open x</ExternalAction>
    </>
  );
}

function SophonDocument() {
  return (
    <>
      <p className="document-eyebrow">oss / active project</p>
      <h2>Sophon</h2>
      <p className="document-lede">Local AI, entirely in the browser.</p>
      <div className="document-copy">
        <p>
          A browser-only chat tool that runs ONNX language models in a Web
          Worker with WebGPU. Prompts stay on the device instead of travelling
          to an inference server.
        </p>
      </div>
      <div className="document-tags" aria-label="Project technologies">
        <span>webgpu</span>
        <span>onnx</span>
        <span>typescript</span>
        <span>local-first</span>
      </div>
      <div className="document-actions">
        <ExternalAction href="https://sophon-coral.vercel.app">
          launch sophon
        </ExternalAction>
        <ExternalAction href="https://github.com/rangan39/sophon">
          view source
        </ExternalAction>
      </div>
    </>
  );
}

function fileContent(
  id: FileId,
  copied: boolean,
  copyHandle: () => Promise<void>,
) {
  switch (id) {
    case "linkedin":
      return <LinkedInDocument />;
    case "instagram":
      return <InstagramDocument />;
    case "discord":
      return <DiscordDocument copied={copied} copyHandle={copyHandle} />;
    case "x":
      return <XDocument />;
    case "sophon":
      return <SophonDocument />;
    default:
      return <AboutDocument />;
  }
}

export function PortfolioExplorer() {
  const [activeFileId, setActiveFileId] = useState<FileId | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<
    Record<GroupId, boolean>
  >({
    work: false,
    contact: false,
    oss: false,
  });
  const [copied, setCopied] = useState(false);

  const activeFile = activeFileId ? getFile(activeFileId) : null;

  useEffect(() => {
    function syncFileFromHistory() {
      const fileId = window.location.hash.slice(1);
      setActiveFileId(
        fileId === "about" || fileId === "discord" ? fileId : null,
      );
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && activeFileId) {
        returnToIndex();
      }
    }

    syncFileFromHistory();
    window.addEventListener("hashchange", syncFileFromHistory);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("hashchange", syncFileFromHistory);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeFileId]);

  function returnToIndex() {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    setActiveFileId(null);
  }

  function toggleGroup(id: GroupId) {
    setExpandedGroups((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  async function copyDiscordHandle() {
    try {
      await navigator.clipboard.writeText("gauravranganath");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="archive-shell">
      <section className="vault" aria-label="r39 filesystem">
        <div className="vault-bar">
          <span className="vault-path">
            {activeFile ? (
              <>
                <button
                  type="button"
                  className="vault-root-link"
                  onClick={returnToIndex}
                  aria-label="Return to index"
                >
                  ~/r39
                </button>
                <span className="vault-current-path">
                  {activeFile.path.replace("~/r39", "")}
                </span>
              </>
            ) : (
              <>
                <span aria-hidden="true">~</span>/r39
              </>
            )}
          </span>
          <span className="vault-kind">
            {activeFile ? activeFile.name.split(".").at(-1) : "index"}
          </span>
        </div>

        {activeFile ? (
          <article className="document-view">
            <button
              type="button"
              className="return-row"
              onClick={returnToIndex}
              aria-label="Back to index"
            >
              <span className="return-icon" aria-hidden="true">
                ←
              </span>
              <span className="return-name">back to index</span>
              <kbd className="return-shortcut">esc</kbd>
              <span className="entry-arrow" aria-hidden="true">
                ↵
              </span>
            </button>
            <div className="document-body">
              {fileContent(activeFile.id, copied, copyDiscordHandle)}
            </div>
          </article>
        ) : (
          <div className="directory-view">
            <div className="listing-head" aria-hidden="true">
              <span>mode</span>
              <span>name</span>
              <span>data</span>
              <span />
            </div>

            <a
              className="file-row"
              href={`#${aboutFile.id}`}
              aria-label={`Open ${aboutFile.name}`}
            >
              <span className="entry-mode">{aboutFile.mode}</span>
              <span className="entry-name">{aboutFile.name}</span>
              <span className="entry-meta">{aboutFile.meta}</span>
              <span className="entry-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <a
              className="file-row"
              href={githubFile.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${githubFile.name}`}
            >
              <span className="entry-mode">{githubFile.mode}</span>
              <span className="entry-name">{githubFile.name}</span>
              <span className="entry-meta">{githubFile.meta}</span>
              <span className="entry-arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            {groups.map((group) => {
              const isExpanded = expandedGroups[group.id];

              return (
                <div className="folder-group" key={group.id}>
                  <button
                    type="button"
                    className="file-row folder-row"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`${group.id}-files`}
                  >
                    <span className="entry-mode">drw</span>
                    <span className="entry-name">{group.name}</span>
                    <span className="entry-meta">{group.meta}</span>
                    <span className="entry-arrow" aria-hidden="true">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  {isExpanded ? (
                    <div className="nested-files" id={`${group.id}-files`}>
                      {group.children.map((file) => {
                        const rowContent = (
                          <>
                            <span className="entry-mode">{file.mode}</span>
                            <span className="entry-name">
                              <span className="nested-branch" aria-hidden="true">
                                └─
                              </span>
                              {file.name}
                            </span>
                            <span className="entry-meta">{file.meta}</span>
                            <span className="entry-arrow" aria-hidden="true">
                              {file.href ? "↗" : "→"}
                            </span>
                          </>
                        );

                        return file.href ? (
                          <a
                            className="file-row nested-row"
                            href={file.href}
                            key={file.id}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${file.name}`}
                          >
                            {rowContent}
                          </a>
                        ) : (
                          <a
                            className="file-row nested-row"
                            href={`#${file.id}`}
                            key={file.id}
                            aria-label={`Open ${file.name}`}
                          >
                            {rowContent}
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}

        <div className="vault-footer" aria-hidden="true">
          <span>{activeFile ? activeFile.name : "5 items / 7 files"}</span>
          <span className="vault-signal">
            <i />
            ready
          </span>
        </div>
      </section>

    </main>
  );
}
