import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";
import { getSchema } from "../config/getSchema.js";

import { readData } from "../helpers/fileHelper.js";
import { applyFilter } from "../helpers/recordHelper.js";
import { validateFilterKeys } from "../helpers/validateHelper.js";

export const findByColumnsData = ({ table, filter }) => {
    const cfg = getConfig();
    const schema = getSchema(table);

    validateFilterKeys(filter, schema.columns);

    const path = buildDataPath(cfg, table);
    const data = readData(path);

    return data.find(row =>
        Object.keys(filter).every(key => row[key] === filter[key])
    ) || null;
};