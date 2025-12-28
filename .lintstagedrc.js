module.exports = {
  // Biome: format and lint all supported files
  "**/*.{js,jsx,ts,tsx,json,jsonc}":
    "biome check --write --unsafe --no-errors-on-unmatched --files-ignore-unknown=true",
};
