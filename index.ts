// Run the right environment...

// Load env vars, for the `GRAPHQL` endpoint and anything else we need
// cross-env NODE_ENV=production ts-node index.ts dotenv_config_path=./dev-server.env
require("dotenv/config");

// Catch CTRL/CMD+C interrupts cleanly
process.on("SIGINT", () => {
  process.exit();
});
// Build mode?
let script = ["build", "static"].includes(process.env.npm_lifecycle_event!)
    ? process.env.npm_lifecycle_event! : process.env.NODE_ENV || "development";
if (process.env.SCRIPT_RUNNER) {
  script = process.env.SCRIPT_RUNNER;
}

// Start the script
require(`./src/runner/${script}`);
