import configJson from "./config.json" with { type: "json" };
import { kschema } from "@keshavsoft/kschema";

kschema.loadConfig(configJson);

const isDeleted = kschema.table("LedgerNames").delete(1);

console.log("isDeleted : ", isDeleted);
