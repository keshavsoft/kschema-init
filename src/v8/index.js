import { loadConfig, getConfig } from "../core/configStore.js";
import {
    insertData,
    getData,
    updateData,
    deleteData,
    insertDataStrict,
    findByPkData,
    filterByPkData,
    filterByColumnsData,
    deleteByColumnsData
} from "./data/index.js";
// Core entry point for kschema operations
// Exposes config + table-level data APIs

export const kschema = {
    loadConfig,   // Initialize configuration (must be called first)
    getConfig,    // Access current config

    // Table-scoped operations
    table: (tableName) => ({

        // Create
        insert: (record) => insertData({ table: tableName, record }),
        insertStrict: (record) => insertDataStrict({ table: tableName, record }),

        // Read
        get: () => getData({ table: tableName }),
        findByPk: (id) => findByPkData({ table: tableName, id }),

        // Filter
        filterByPk: (id) => filterByPkData({ table: tableName, id }),
        filterByColumns: (filter) => filterByColumnsData({ table: tableName, filter }),

        // Update
        update: (record) => updateData({ table: tableName, record }),

        // Delete
        delete: (id) => deleteData({ table: tableName, id }),                 // delete single by primary key
        deleteByPk: (id) => deleteData({ table: tableName, id }),             // alias for delete
        deleteByColumns: (filter) => deleteByColumnsData({ table: tableName, filter }) // bulk delete by condition
    })
};