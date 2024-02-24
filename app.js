import { program } from "commander";
import replacer from "./replacer.js";
import fs from "fs";

program
  .version("1.0.0")
  .description("Convert markdown to html")
  .arguments("<inputFile>")
  .option("-o, --out <outputFile>", "Write result tp given file")
  .parse(process.argv);

const content = fs.readFileSync(program.args[0], "utf8");
const result = replacer(content);

if (program.outputFile) {
  fs.writeFileSync(program.outputFile, result, "utf8");
} else {
  console.log(result);
}