import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";
import { getSchema } from "../config/getSchema.js";
import { getPrimaryKey } from "../helpers/pkHelper.js";
import { readData, writeData } from "../helpers/fileHelper.js";

const deleteData = ({ table, id }) => {
    const config = getConfig();
    const path = buildDataPath(config, table);

    const pk = getPrimaryKey(getSchema(table).columns);

    const data = readData(path);

    if (!data.some(item => item[pk] === id)) throw new Error(`${pk}: ${id} not found`);

    writeData(path, data.filter(item => item[pk] !== id));

    return true;
};

export { deleteData };