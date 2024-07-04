export function scrollToBottom(el: HTMLElement): void {
  el.scroll({
    top: el.scrollHeight,
    behavior: "smooth",
  });
}
