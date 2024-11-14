import { DebugForm } from "./debug.js";
import { People } from "./people.js";
import { Notes } from "./notes.js";
import { Charts } from "./charts.js";

function main() {
  new Charts();
  new People();
  new Notes();
  
  console.log("hello")
  if (document.querySelector(".debug-card")) {
    const debug = new DebugForm();
    debug.showResponse("");
  }
}

main();