import configJson from "./config.json" with { type: "json" };
import { kschema } from "@keshavsoft/kschema";

kschema.loadConfig(configJson);

const data = kschema.table("LedgerNames").get();

console.log("get Data : ", data);
