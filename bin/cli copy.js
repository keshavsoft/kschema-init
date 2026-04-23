#!/usr/bin/env node

import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const run = async () => {
    try {
        // pick folders like v2, v3, v4
        const versions = fs.readdirSync(__dirname)
            .filter(name => /^v\d+$/.test(name))
            .sort((a, b) => {
                const na = parseInt(a.replace('v', ''), 10);
                const nb = parseInt(b.replace('v', ''), 10);
                return na - nb;
            });

        const latest = versions.at(-1);

        if (!latest) {
            console.log("No CLI versions found");
            return;
        }

        const mod = await import(`./${latest}/start.js`);

        if (typeof mod.default !== "function") {
            console.log(`Invalid start.js in ${latest}`);
            return;
        };

        await mod.default();
    } catch (e) {
        console.log("CLI failed:", e?.message || e);
        process.exit(1);
    };
};

run();