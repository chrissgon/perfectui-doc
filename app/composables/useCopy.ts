/**
 * Copies text to the clipboard and reports "Copied" for `duration` ms. The Clipboard API fails
 * where the page has no clipboard permission or focus (an embedded frame, a focused DevTools),
 * so the legacy copy command is tried before the caller falls back to selecting the text.
 */
export function useCopy(duration: number) {
  const copied = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  onBeforeUnmount(() => clearTimeout(timer));

  async function copy(text: string): Promise<boolean> {
    let ok: boolean;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = legacyCopy(text);
    }
    if (ok) {
      copied.value = true;
      clearTimeout(timer);
      timer = setTimeout(() => (copied.value = false), duration);
    }
    return ok;
  }
  return { copied, copy };
}

function legacyCopy(text: string): boolean {
  const focused = document.activeElement;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
  document.body.append(area);
  area.select();
  let ok: boolean;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  if (focused instanceof HTMLElement) focused.focus();
  return ok;
}
