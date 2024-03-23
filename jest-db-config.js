// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("./jest.config");
config.testMatch = ["**/**.specdb.ts"];
module.exports = config;