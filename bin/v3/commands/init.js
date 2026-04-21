import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default ({ inTemplate, inFolderName }) => {
    const folderName = inFolderName || "KehavSoft1";
    let source;

    switch (inTemplate) {
        case "express":
            source = path.join(__dirname, "template", "express");
            break;

        default:
            source = path.join(__dirname, "template", "basic");
            break;
    };

    const destination = path.join(process.cwd(), folderName);

    fs.mkdirSync(destination, { recursive: true });
    fs.cpSync(source, destination, { recursive: true });

    console.log(`Project created in ${folderName}`);
};