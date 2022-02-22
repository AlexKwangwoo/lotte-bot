/* eslint-disable @typescript-eslint/no-var-requires */
var cron = require("node-cron");
const execSync = require("child_process").execSync;

cron.schedule("0 0 1 * * * ", () => {
  execSync("yarn execute:close:testnet");
  console.log("Round is closed");
});

cron.schedule("3 0 1 * * * ", () => {
  execSync("yarn execute:draw:testnet");
  console.log("Round is drawed");
});

cron.schedule("5 0 1 * * * ", () => {
  execSync("yarn execute:start:testnet");
  console.log("New round is started");
});
