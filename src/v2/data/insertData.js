import fs from "fs";
import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";
import { getSchema } from "../config/getSchema.js";
// 🔹 helpers

const getPrimaryKey = (columns) => {
    const pk = columns.find(c => c.unique)?.field;
    if (!pk) throw new Error("Primary key not defined");
    return pk;
};

const readData = (path) => {
    if (!fs.existsSync(path)) return [];
    return JSON.parse(fs.readFileSync(path));
};

const writeData = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

const attachPrimaryKey = (record, pk, data) => {
    if (data.length === 0) {
        return { ...record, [pk]: 1 };
    }

    const maxId = Math.max(...data.map(row => row[pk] || 0));

    return {
        ...record,
        [pk]: maxId + 1
    };
};
// 🔹 main

export const insertData = ({ table, record }) => {
    const config = getConfig();
    const schema = getSchema(table);

    const pk = getPrimaryKey(schema.columns);
    const path = buildDataPath(config, table);

    const data = readData(path);

    const newRecord = attachPrimaryKey(record, pk, data);

    data.push(newRecord);

    writeData(path, data);

    return newRecord;
};