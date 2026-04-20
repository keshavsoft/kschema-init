import fs from "fs";
import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";

export const updateData = ({ table, key, value, updates }) => {
    const cfg = getConfig();
    const path = buildDataPath(cfg, table);

    const data = JSON.parse(fs.readFileSync(path));

    const index = data.findIndex(item => item[key] === value);

    if (index === -1) throw new Error("Record not found");

    data[index] = { ...data[index], ...updates };

    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    return data[index];
};