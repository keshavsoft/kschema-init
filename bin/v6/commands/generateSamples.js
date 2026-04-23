import fs from "fs";
import path from "path";

import { schemaMeta } from "@keshavsoft/kschema";
import { baseTemplate } from "./template/baseTemplate.js";

export default () => {
    const OUTPUT_DIR = path.resolve(process.cwd(), "samples");

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    };

    Object.entries(schemaMeta.query).forEach(([key, meta]) => {

        const finalCode = baseTemplate({ body: meta.body });

        fs.writeFileSync(path.join(OUTPUT_DIR, `${key}.js`), finalCode);

    });
};
