import { parse as argparse } from "https://deno.land/std@0.181.0/flags/mod.ts";
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const args = argparse(Deno.args, {
  boolean: [
    // instructions for this script
    "help",

    // output js
    "j",
    "json",

    // debug mode
    "debug",
  ],
});

const commandName = `npmjsq`;

const usageMessage = `
Usage: ${commandName} [OPTIONS] <npm package>
a npmjs.com query tool

Options:
  --help              Show this help message
  --debug             Debug mode

  -j, --json          Output json

  Examples:
  ${commandName} deno
`;

// parse args
const help = args.help;
const debugMode = args.debug;
let outputJSON = args.json || args.j;

const baseUrl = "https://www.npmjs.com/search";
let qParams = "";

// setup query
let searchTerm = Deno.args[0];
let searchQuery = `${baseUrl}?q=${searchTerm}${qParams}`;

if (debugMode) {
  console.debug("will query: " + searchQuery);
}

if (help) {
  console.log(usageMessage);
  Deno.exit();
}

// fetch
let res = await fetch(searchQuery);
let resText = await res.text();

// parse
const doc = new DOMParser().parseFromString(resText, "text/html")!;
let qEntries = await doc.querySelectorAll("script");

// process
if (!outputJSON) {
  console.log("   Packages Found   ");
  console.log("--------------------");
}
for (const qq of qEntries) {
  if (qq.innerText.includes("window.__context__ =")) {
    let scriptSrc = qq.innerText.replace("window.__context__ =", "");

    if (debugMode) {
      console.debug(scriptSrc);
    }

    let packageJsonData = JSON.parse(scriptSrc);
    let result = packageJsonData.context.objects;

    if (outputJSON) {
      result = JSON.stringify(result, null, "  ");
      console.log(result);
    } else {
      for (const pkg of result) {
        console.log(pkg.package.name, pkg.package.version);
      }
    }
  }
}
