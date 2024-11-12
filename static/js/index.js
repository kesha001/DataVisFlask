import { DebugForm } from "./debug.js";
import { People } from "./people.js";
import { Notes } from "./notes.js";
import { createChart } from "./charts.js";

function main() {
  new People();
  new Notes();
  if (document.querySelector(".debug-card")) {
    const debug = new DebugForm();
    debug.showResponse("");
  }
  // if (document.getElementById('myChart')) {
  console.log("Hello");
  createChart(labels, dataPoints);
  
  // }
}

main();