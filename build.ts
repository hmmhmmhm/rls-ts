import fs from "fs";
import { transform } from "@swc/core";

(async () => {
  const fileNames = fs.readdirSync("./src");
  for (const fileName of fileNames) {
    const source = fs.readFileSync(`./src/${fileName}`, "utf-8");
    if (!fs.existsSync("./build")) fs.mkdirSync("./build");

    let { code } = await transform(
      `function createPolicy(cb) {
  cb({
    row: globalThis,
    function: globalThis,
    auth: globalThis.auth,
    plv8: globalThis.plv8,
  });
}

${source}`,
      {
        sourceMaps: false,
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false,
          },
        },
      }
    );

    code = `-- ${fileName}.plv8.sql
boolean as $$
${code.trim()}
$$ language plv8;`.replace("export default", "return");

    fs.writeFileSync(`./build/${fileName.split(".")[0]}.plv8.sql`, code);
  }
})();
