export const normalizeRecord = (record, columns) => {
    const clean = {};
    columns.forEach(col => {
        if (record[col.field] !== undefined) {
            clean[col.field] = record[col.field];
        }
    });
    return clean;
};

export const applyFilter = (data, filter) => {
    return data.filter(row =>
        Object.keys(filter).every(key => row[key] === filter[key])
    );
};