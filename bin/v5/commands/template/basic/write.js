import { kschema } from "@keshavsoft/kschema";
import consfigJson from './config.json' with { type: 'json' };

kschema.loadConfig(consfigJson);

const insertedPk = kschema.table("LedgerNames").insert({ LedgerName: "Keshav" });

console.log("insertedPk : ", insertedPk);
