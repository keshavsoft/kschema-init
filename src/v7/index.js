import { loadConfig, getConfig } from "../core/configStore.js";
import {
    insertData,
    getData,
    updateData,
    deleteData,
    insertDataStrict,
    findByPkData,
    filterByPkData,
    filterByColumnsData
} from "./data/index.js";

export const kschema = {
    loadConfig,
    getConfig,

    table: (table) => ({
        insert: (record) => insertData({ table, record }),
        get: () => getData({ table }),
        update: (record) => updateData({ table, record }),
        delete: (id) => deleteData({ table, id }),
        insertStrict: (record) => insertDataStrict({ table, record }),
        findByPk: (id) => findByPkData({ table, id }),
        filterByPk: (id) => filterByPkData({ table, id }),
        filterByColumns: (filter) => filterByColumnsData({ table, filter }),
    })
};