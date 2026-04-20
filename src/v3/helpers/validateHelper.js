// v3/helpers/validateHelper.js

export const validateRecord = (record, columns, data) => {
    columns.forEach(col => {
        const value = record[col.field];

        // required
        if (col.required && value === undefined) {
            throw new Error(`${col.field} is required`);
        }

        // unique
        if (col.unique) {
            const exists = data.some(row => row[col.field] === value);
            if (exists) {
                throw new Error(`${col.field} must be unique`);
            }
        }
    });
};