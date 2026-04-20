// v3/helpers/pkHelper.js

export const getPrimaryKey = (columns) => {
    const pkColumn = columns.find(c => c.primary);
    if (!pkColumn) throw new Error("Primary key not defined");
    return pkColumn.field;
};

export const attachPrimaryKey = (record, pk, data) => {
    const maxId = data.length
        ? Math.max(...data.map(row => row[pk] || 0))
        : 0;

    return {
        ...record,
        [pk]: maxId + 1
    };
};