/**
 * insertDataStrict - Strict Orchestration Flow
 *
 * 1. Load config & schema
 * 2. Resolve primary key + file path
 * 3. Reject manual primary key input
 * 4. Reject extra fields (only schema fields allowed)
 * 5. Read existing data
 * 6. Normalize record (keep only schema fields)
 * 7. Validate (required + unique on schema columns)
 * 8. Attach primary key (auto increment)
 * 9. Push + persist to file
 * 10. Return inserted record
 *
 * Notes:
 * - Only schema-defined fields are allowed
 * - Any extra field will throw an error
 * - Primary key is system-generated only
 */
import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";
import { getSchema } from "../config/getSchema.js";

import { getPrimaryKey, attachPrimaryKey } from "../helpers/pkHelper.js";
import { readData, writeData } from "../helpers/fileHelper.js";
import { validateRecord } from "../helpers/validateHelper.js";
import { normalizeRecord } from "../helpers/recordHelper.js";

export const insertDataStrict = ({ table, record }) => {
    try {
        const config = getConfig();
        const schema = getSchema(table);

        const pk = getPrimaryKey(schema.columns);
        const path = buildDataPath(config, table);

        const schemaFields = schema.columns.map(c => c.field);

        if (pk in record) {
            throw new Error(`Primary key '${pk}' should not be provided`);
        };

        const extraFields = Object.keys(record).filter(
            key => !schemaFields.includes(key)
        );

        if (extraFields.length) {
            throw new Error(`Invalid fields: ${extraFields.join(", ")}`);
        };

        const data = readData(path);

        const cleanRecord = normalizeRecord(record, schema.columns);

        validateRecord(cleanRecord, schema.columns, data);

        const newRecord = attachPrimaryKey(cleanRecord, pk, data);

        data.push(newRecord);

        writeData(path, data);

        return pk;
    } catch (err) {
        return {
            success: false,
            error: {
                message: err.message,
                code: "VALIDATION_ERROR"
            }
        };
    };
};