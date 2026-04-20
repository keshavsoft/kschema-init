import fs from "fs";
import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";

// 🔹 helpers

const getPrimaryKey = (columns) => {
    const pk = columns.find(c => c.unique)?.field;
    if (!pk) throw new Error("Primary key not defined");
    return pk;
};

const readData = (path) => {
    return JSON.parse(fs.readFileSync(path));
};

const writeData = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

const attachPrimaryKey = (record, pk) => {
    return {
        ...record,
        [pk]: Date.now()
    };
};

// 🔹 main

export const insertData = ({ table, record }) => {
    const config = getConfig();
    const schema = config[table];

    const pk = getPrimaryKey(schema.columns);
    const path = buildDataPath(config, table);

    const data = readData(path);

    const newRecord = attachPrimaryKey(record, pk);

    data.push(newRecord);

    writeData(path, data);

    return newRecord;
};