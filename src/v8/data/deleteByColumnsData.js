import { getConfig } from "../../core/configStore.js";
import { buildDataPath } from "../../utils/pathBuilder.js";
import { readData, writeData } from "../helpers/fileHelper.js";
import { applyFilter } from "../helpers/recordHelper.js";

const deleteByColumnsData = ({ table, filter }) => {
    const config = getConfig();
    const path = buildDataPath(config, table);
    const data = readData(path);

    const toDelete = applyFilter(data, filter);
    if (toDelete.length === 0) throw new Error(`No records match filter`);

    const newData = data.filter(item => !toDelete.includes(item));
    writeData(path, newData);

    return toDelete.length;
};

export { deleteByColumnsData };