import init from "../commands/init.js";
import test from "../commands/test.js";

const map = {
    init,
    test,
};

export default function resolveCommand(cmd) {
    return map[cmd] || null;
};