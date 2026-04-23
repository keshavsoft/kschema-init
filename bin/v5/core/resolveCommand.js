import init from "../commands/init.js";
import test from "../commands/test.js";
import generateSamples from "../commands/generateSamples.js";

const map = {
    init,
    test,
    generateSamples
};

export default function resolveCommand(cmd) {
    return map[cmd] || null;
};