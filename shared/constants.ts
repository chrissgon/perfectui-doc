export const INSTALLATION_IMPORT_CDNS = {
  input: `<!DOCTYPE html> 
<html>
  <head>
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- import css cdn -->
    <link rel="stylesheet" href="https://unpkg.com/@chrissgon/perfectui@latest/dist/perfectui.css">
  </head>
  <body>
    <button class="btn btn-solid-primary">
      My button
    </button>
    
    <!-- import javascript cdn -->
    <script src="https://unpkg.com/@chrissgon/perfectui@latest/dist/perfectui.js"></script>

    <script>
      // access the functions via window or document
      console.log(window.perfectui) // { setTheme: ƒ ...}
      console.log(document.perfectui) // { setTheme: ƒ ...}
    </script>
  </body>
</html>`,

  preview: `
  <button class="btn btn-solid-primary">
    My button
  </button>`,
};

export const INSTALLATION_IMPORT_MODULE = {
  input: `import { setTheme } from "@chrissgon/perfectui";
import "@chrissgon/perfectui/dist/perfectui.css";`
}