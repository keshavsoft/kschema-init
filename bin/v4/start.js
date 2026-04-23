import parseInput from "./core/parseInput.js";
import resolveCommand from "./core/resolveCommand.js";

const run = async () => {
    const input = parseInput();

    if (!input.cmd) {
        console.log("Usage: kschema <init|test> [args]");
        return;
    }

    const command = resolveCommand(input.cmd);

    if (!command) {
        console.log(`Unknown command: ${input.cmd}`);
        console.log("Usage: kschema <init|test> [args]");
        return;
    };

    await command(input);
};

export default run;