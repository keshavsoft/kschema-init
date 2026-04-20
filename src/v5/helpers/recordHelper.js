export const normalizeRecord = (record, columns) => {
    const clean = {};
    columns.forEach(col => {
        if (record[col.field] !== undefined) {
            clean[col.field] = record[col.field];
        }
    });
    return clean;
};