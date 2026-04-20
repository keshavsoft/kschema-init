/**
 * insertData - Orchestration Flow
 *
 * 1. Load config & schema
 * 2. Resolve primary key + file path
 * 3. Read existing data
 * 4. Prepare record (allow extra fields, validate only schema fields)
 * 5. Validate (required + unique only on schema columns)
 * 6. Attach primary key (auto increment)
 * 7. Push + persist to file
 * 8. Return inserted record
 *
 * Notes:
 * - Extra fields are NOT validated but are stored
 * - Schema drives validation, not storage
 */
import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";
import { getSchema } from "../config/getSchema.js";

import { getPrimaryKey, attachPrimaryKey } from "../helpers/pkHelper.js";
import { readData, writeData } from "../helpers/fileHelper.js";
import { validateRecord } from "../helpers/validateHelper.js";
import { normalizeRecord } from "../helpers/recordHelper.js";

/**
 * Inserts a record into the data store
 *
 * @param {Object} params
 * @param {string} params.table - Table name
 * @param {Object} params.record - Record data to insert
 *
 * @returns {Object} Inserted record with primary key
 */
export const insertData = ({ table, record }) => {
    const config = getConfig();
    const schema = getSchema(table);

    const pk = getPrimaryKey(schema.columns);
    const path = buildDataPath(config, table);

    const data = readData(path);

    // const cleanRecord = normalizeRecord(record, schema.columns);
    const cleanRecord = { ...record };

    validateRecord(cleanRecord, schema.columns, data);

    const newRecord = attachPrimaryKey(cleanRecord, pk, data);

    data.push(newRecord);

    writeData(path, data);

    return newRecord;
};