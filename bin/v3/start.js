import init from "./commands/init.js";
import test from "./commands/test.js";

const v3Func = () => {
    const cmd = process.argv[2];
    const template = process.argv[3];
    const folderName = process.argv[4];

    switch (cmd) {
        case "init":
            init({
                inTemplate: template,
                inFolderName: folderName
            });
            break;

        case "test":
            test(arg);
            break;

        default:
            console.log("Usage: kschema <init|test> [name]");
    };

};

export { v3Func };