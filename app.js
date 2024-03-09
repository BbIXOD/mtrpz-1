import { program } from "commander";
import replacer from "./markdownReplacer.js";
import fs from "fs";

program
  .version("1.0.0")
  .argument('<inputFile>', 'Input markdown file')
  .option("-o, --out <outputFile>", "Write result tp given file")
  .option("-f, --format", "Html/Escape codes", false)
  .description("Convert markdown to html")
  .parse(process.argv);

const { out, format } = program.opts();

const content = fs.readFileSync(program.args[0], "utf8");
const result = replacer(content, format ? 1 : 0);

if (out) {
  fs.writeFileSync(out, result, "utf8");
} else {
  console.log(result);
}