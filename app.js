import { program } from "commander";
import replacer from "./replacer.js";
import fs from "fs";

program
  .version("1.0.0")
  .argument('<inputFile>', 'Input markdown file')
  .description("Convert markdown to html")
  .option("-o, --out <outputFile>", "Write result tp given file")
  .parse(process.argv);


const content = fs.readFileSync(program.args[0], "utf8");
const result = replacer(content);
const out = program.opts().out

if (out) {
  fs.writeFileSync(out, result, "utf8");
} else {
  console.log(result);
}