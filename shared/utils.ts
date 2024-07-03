import type { ISectionLinks } from "./interfaces";

export function scrollToBottom(el: HTMLElement): void {
  el.scroll({
    top: el.scrollHeight,
    behavior: "smooth",
  });
}

export function getSectionLinks(): ISectionLinks{
  const sections:ISectionLinks= [];

  const contents = document.querySelectorAll(
    ".docs-content"
  ) as NodeListOf<HTMLElement>;

  for (const content of contents) {
    sections.push({
      id: content.id,
      label: content.querySelector(".docs-title")?.textContent?.trim() ?? "",
    });
  }

  return sections;
}
