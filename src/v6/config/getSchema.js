import fs from "fs";
import { getConfig } from "../../core/configStore.js";

export const getSchema = (table) => {
    const config = getConfig();

    const schemaPath = `${config.SchemaPath}/${table}.json`;

    const schema = fs.readFileSync(schemaPath, "utf-8");

    return JSON.parse(schema);
};