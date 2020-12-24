import "./style.css";
import { applyPolyfill } from "custom-elements-hmr-polyfill";
applyPolyfill();

import("./elements/app-root").then(() => {
  if (document.body) {
    document.body.innerHTML = "";
    document.body.innerHTML = `<app-root class="flex flex-col h-full"></app-root>`;

    /// little more dynamic
    //const tagname = document.body.firstElementChild?.tagName;
    //const classnames = document.body.firstElementChild?.className;
    //document.body.innerHTML = "";
    //document.body.innerHTML = `<${tagname} class="${classnames}"></${tagname}>`;
  }
});
