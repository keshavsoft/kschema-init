export const decideFolderName = ({ inFolderName, template }) => {
    const brand = "keshavsoft";
    return inFolderName || `${brand}-${template}-${Date.now()}`;
};