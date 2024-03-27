import { program } from "commander";
import replacer from "./markdownReplacer.js";
import fs from "fs";

program
  .version("1.0.0")
  .argument('<inputFile>', 'Input markdown file')
  .option("-o, --out <outputFile>", "Write result tp given file")
  .option("-f, --format [format]", "Html/Escape codes", "html")
  .description("Convert markdown to html")
  .parse(process.argv);

const { out, format } = program.opts();

if (format != "html" && format != "esc") throw new Error("Invalid type")

const content = fs.readFileSync(program.args[0], "utf8");
const result = replacer(content, "html" ? 0 : 1);

if (out) {
  fs.writeFileSync(out, result, "utf8");
} else {
  console.log(result);
}
