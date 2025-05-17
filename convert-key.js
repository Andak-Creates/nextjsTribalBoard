const fs = require("fs");

const raw = fs.readFileSync("./serviceAccountKey.json", "utf8");
const json = JSON.stringify(JSON.parse(raw)).replace(/\n/g, "\\n");
console.log(json);
