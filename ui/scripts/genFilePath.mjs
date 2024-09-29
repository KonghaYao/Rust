import { glob } from "glob";
import fs from "fs";
const files = await glob("../src/**/*.rs");

const index = files.map((i) => {
  return {
    path: i.split("src", 2)[1],
  };
});
fs.writeFileSync("./public/index.json", JSON.stringify(index, null, 2));
