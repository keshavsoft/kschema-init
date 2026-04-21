import { decideTemplate } from "./steps/decideTemplate.js";
import { decideFolderName } from "./steps/decideFolderName.js";
import { locateSource } from "./steps/locateSource.js";
import { locateDestination } from "./steps/locateDestination.js";
import { createProject } from "./steps/createProject.js";
import { announce } from "./steps/announce.js";

export default ({ inTemplate, inFolderName }) => {
    const template = decideTemplate({ inTemplate });
    const folderName = decideFolderName({ inFolderName, template });

    const source = locateSource({ template });
    const destination = locateDestination({ folderName });

    createProject({ source, destination });

    announce({ folderName });
};