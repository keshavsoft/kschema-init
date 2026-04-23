import { decideTemplate } from "./steps/decideTemplate.js";

import { locateSource } from "./steps/locateSource.js";
import { locateDestination } from "./steps/locateDestination.js";
import { createProject } from "./steps/createProject.js";
import { announce } from "./steps/announce.js";

import resolveFolderName from "../core/resolveFolderName.js";

export default ({ template, folderName }) => {
    const finalTemplate = decideTemplate({ inTemplate: template });

    const resolvedFolderName = resolveFolderName({
        name: folderName
    });

    const source = locateSource({ template: finalTemplate });
    const destination = locateDestination({ inResolvedFolderName: resolvedFolderName });

    createProject({ source, destination });

    announce({ inResolvedFolderName: resolvedFolderName });
};