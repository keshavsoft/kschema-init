// v3/helpers/fileHelper.js
import fs from "fs";

export const readData = (path) => {
    if (!fs.existsSync(path)) return [];
    return JSON.parse(fs.readFileSync(path, "utf-8"));
};

export const writeData = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};