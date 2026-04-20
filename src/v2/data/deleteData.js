import fs from "fs";
import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";

export const deleteData = ({ table, key, value }) => {
    const cfg = getConfig();
    const path = buildDataPath(cfg, table);

    const data = JSON.parse(fs.readFileSync(path));

    const newData = data.filter(item => item[key] !== value);

    fs.writeFileSync(path, JSON.stringify(newData, null, 2));

    return true;
};