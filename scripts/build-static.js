const fs = require("node:fs");
const path = require("node:path");

const siteDir = path.join(process.cwd(), "S");
const indexFile = path.join(siteDir, "index.html");

if (!fs.existsSync(indexFile)) {
  console.error('Build failed: expected "S/index.html" to exist.');
  process.exit(1);
}

console.log("Static site ready in S");
