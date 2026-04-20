import fs from "fs";
import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";

export const insertData = ({ table, record }) => {
    const cfg = getConfig();
    const path = buildDataPath(cfg, table);

    const data = JSON.parse(fs.readFileSync(path));

    data.push(record);

    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    return record;
};