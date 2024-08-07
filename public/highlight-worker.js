import hljs from "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/core.min.js";

import typescript from "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/languages/typescript.min.js";
import javascript from "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/languages/javascript.min.js";
import xml from "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/languages/xml.min.js";
import bash from "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/languages/bash.min.js";
import markdown from "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/languages/markdown.min.js";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("markdown", markdown);

onmessage = (e) => {
  const { input, lang } = e.data;
  if(!lang) return
  const highlight = hljs.highlight(input, {
    language: lang,
  }).value;
  postMessage({ ...e.data, highlight });
};
