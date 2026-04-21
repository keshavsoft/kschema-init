import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brand = "keshavsoft";

export default ({ inTemplate, inFolderName }) => {
    const template = resolveTemplate({ inTemplate });
    const folderName = resolveFolderName({ inFolderName, template });
    const source = resolveSource({ template });
    const destination = resolveDestination({ folderName });

    createProject({ source, destination });

    logSuccess({ folderName });
};

const resolveTemplate = ({ inTemplate }) => {
    return inTemplate || "basic";
};

const resolveFolderName = ({ inFolderName, template }) => {
    return inFolderName || `${brand}-${template}-${Date.now()}`;
};

const resolveSource = ({ template }) => {
    return path.join(
        __dirname,
        "template",
        template === "express" ? "express" : "basic"
    );
};

const resolveDestination = ({ folderName }) => {
    return path.join(process.cwd(), folderName);
};

const createProject = ({ source, destination }) => {
    fs.mkdirSync(destination, { recursive: true });
    fs.cpSync(source, destination, { recursive: true });
};

const logSuccess = ({ folderName }) => {
    console.log(`[keshavsoft] Project created: ${folderName}`);
};