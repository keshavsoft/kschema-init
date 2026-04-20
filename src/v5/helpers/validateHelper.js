export const validateRecord = (record, columns, data) => {
    columns.forEach(col => {
        const value = record[col.field];

        if (col.required && (value === undefined || value === "")) {
            throw new Error(`${col.field} is required`);
        }

        if (value === undefined) return;

        if (col.unique && data.some(r => r[col.field] === value)) {
            throw new Error(`${col.field} must be unique`);
        }
    });
};