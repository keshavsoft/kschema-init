import configJson from "./config.json" with { type: "json" };
import { kschema } from "@keshavsoft/kschema";

kschema.loadConfig(configJson);

const insertedPk = kschema.table("LedgerNames").insert({ LedgerName: "Keshav" });

console.log("inserted Pk : ", insertedPk);
