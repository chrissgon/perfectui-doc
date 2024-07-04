import type { ISectionLinks } from "./interfaces";

export function scrollToBottom(el: HTMLElement): void {
  el.scroll({
    top: el.scrollHeight,
    behavior: "smooth",
  });
}

export function getSectionLinks(): ISectionLinks {
  const sections: ISectionLinks = [];

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

export function addSmoothScrollSectionLinks(offsetTop: number = 0): void {
  const anchors = document.querySelectorAll(
    "a.section-link"
  ) as NodeListOf<HTMLAnchorElement>;

  for (const anchor of anchors) {
    anchor.addEventListener("click", function (e: MouseEvent) {
      e.preventDefault();
      const href = this.getAttribute("href");

      if (!href) return;

      const targetElement = document.querySelector(href) as HTMLElement;

      if (!targetElement) return;
      window.scrollTo({
        top: targetElement.offsetTop - offsetTop,
        behavior: "smooth",
      });
    });
  }
}
