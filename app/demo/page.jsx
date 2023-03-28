const zlib = require("zlib");

const input =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";
const compressed = zlib.deflateSync(input).toString("base64");

console.log(`Compressed string: ${compressed}`);
