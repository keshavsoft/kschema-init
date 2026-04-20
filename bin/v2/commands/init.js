// commands/init.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (arg) => {
    const folderName = arg || "KehavSoft1";

    const source = path.join(__dirname, "template");
    const destination = path.join(process.cwd(), folderName);

    fs.mkdirSync(destination, { recursive: true });
    fs.cpSync(source, destination, { recursive: true });

    console.log(`Project created in ${folderName}`);
};