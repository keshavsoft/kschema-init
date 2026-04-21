import path from "path";

export const locateDestination = ({ folderName }) => {
    return path.join(process.cwd(), folderName);
};