"use client";

import { useEffect, useState, type ReactNode } from "react";

type FileId =
  | "about"
  | "github"
  | "linkedin"
  | "email"
  | "debianGuide"
  | "minecraftSkill";

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
    id: "oss",
    name: "oss/",
    meta: "2 items",
    children: [
      {
        id: "debianGuide",
        name: "debian-os-bootable-usb-guide.git",
        path: "~/r39/oss/debian-os-bootable-usb-guide",
        mode: "-rw",
        meta: "MIT",
        href: "https://github.com/rangan39/debian-os-bootable-usb-guide",
      },
      {
        id: "minecraftSkill",
        name: "minecraft-server-skill.git",
        path: "~/r39/oss/minecraft-server-skill",
        mode: "-rw",
        meta: "MIT",
        href: "https://github.com/rangan39/minecraft-server-skill",
      },
    ],
  },
  {
    id: "contact",
    name: "contact/",
    meta: "1 item",
    children: [
      {
        id: "email",
        name: "email.txt",
        path: "~/r39/contact/email.txt",
        mode: "-rw",
        meta: "0.1k",
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

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API can be unavailable or blocked (older browsers,
    // permission policy, insecure context) — fall back to the
    // execCommand approach before giving up.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    return succeeded;
  } catch {
    return false;
  }
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
          I&apos;m interested in ML systems engineering—model routing, agents,
          and local AI. I co-authored RouterBench, an open benchmark for
          multi-model routing.
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

type CopyStatus = "idle" | "copied" | "error";

function copyButtonLabel(status: CopyStatus, idleLabel: string) {
  if (status === "copied") return "copied";
  if (status === "error") return "couldn't copy — select manually";
  return idleLabel;
}

function EmailDocument({
  status,
  copyAddress,
}: {
  status: CopyStatus;
  copyAddress: () => Promise<void>;
}) {
  return (
    <>
      <p className="document-eyebrow">contact / email</p>
      <h2>Email</h2>
      <p className="document-lede">rangan39@outlook.com</p>
      <div className="document-copy">
        <p>For projects, research, or a useful conversation.</p>
      </div>
      <button type="button" className="document-action" onClick={copyAddress}>
        <span>{copyButtonLabel(status, "copy email")}</span>
        <span aria-hidden="true">
          {status === "copied" ? "✓" : status === "error" ? "!" : "＋"}
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied"
          ? "Email address copied to clipboard."
          : status === "error"
            ? "Couldn't copy the email address automatically. Please select and copy it manually."
            : ""}
      </span>
    </>
  );
}

function fileContent(
  id: FileId,
  emailCopyStatus: CopyStatus,
  copyEmailAddress: () => Promise<void>,
) {
  switch (id) {
    case "linkedin":
      return <LinkedInDocument />;
    case "email":
      return (
        <EmailDocument status={emailCopyStatus} copyAddress={copyEmailAddress} />
      );
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
  const [emailCopyStatus, setEmailCopyStatus] = useState<CopyStatus>("idle");

  const activeFile = activeFileId ? getFile(activeFileId) : null;

  useEffect(() => {
    function syncFileFromHistory() {
      const fileId = window.location.hash.slice(1);
      setActiveFileId(
        fileId === "about" || fileId === "email" ? fileId : null,
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

  async function copyEmailAddress() {
    const succeeded = await copyTextToClipboard("rangan39@outlook.com");
    setEmailCopyStatus(succeeded ? "copied" : "error");
    window.setTimeout(() => setEmailCopyStatus("idle"), 1800);
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
              {fileContent(activeFile.id, emailCopyStatus, copyEmailAddress)}
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
          <span>{activeFile ? activeFile.name : "5 items / 6 files"}</span>
          <span className="vault-signal">
            <i />
            ready
          </span>
        </div>
      </section>

    </main>
  );
}
