import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";
import { getSchema } from "../config/getSchema.js";

import { getPrimaryKey, attachPrimaryKey } from "../helpers/pkHelper.js";
import { readData, writeData } from "../helpers/fileHelper.js";
import { validateRecord } from "../helpers/validateHelper.js";

export const insertData = ({ table, record }) => {
    const config = getConfig();
    const schema = getSchema(table);

    const pk = getPrimaryKey(schema.columns);
    const path = buildDataPath(config, table);

    const data = readData(path);

    validateRecord(record, schema.columns, data);

    const newRecord = attachPrimaryKey(record, pk, data);

    data.push(newRecord);

    writeData(path, data);

    return newRecord;
};