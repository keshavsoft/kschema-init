import init from "../commands/init.js";
import test from "../commands/test.js";

const cmd = process.argv[2];
const arg = process.argv[3];

switch (cmd) {
    case "init":
        init(arg);
        break;

    case "test":
        test(arg);
        break;

    default:
        console.log("Usage: kschema <init|test> [name]");
};