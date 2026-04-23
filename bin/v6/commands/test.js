// commands/test.js

import fs from "fs";
import path from "path";

export default (arg) => {
    const projectPath = arg
        ? path.resolve(process.cwd(), arg)
        : process.cwd();

    // 1. Check folder exists
    if (!fs.existsSync(projectPath)) {
        console.log("Invalid path");
        return;
    }

    // 2. Check required structure
    const hasConfigJson = fs.existsSync(
        path.join(projectPath, "config.json")
    );

    const hasConfigFolder = fs.existsSync(
        path.join(projectPath, "Config")
    );

    const hasSchemasFolder = fs.existsSync(
        path.join(projectPath, "Config", "Schemas")
    );

    // 3. Final decision
    if (hasConfigJson && hasConfigFolder && hasSchemasFolder) {
        console.log("Already initialized");
    } else {
        console.log("Not initialized");
    }
};