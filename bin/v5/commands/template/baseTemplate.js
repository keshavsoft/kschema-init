export const baseTemplate = ({ body, inTableName = "SampleTable" }) => `
import { kschema } from "@keshavsoft/kschema";

import configJson from "./config.json" with { type: "json" };

kschema.loadConfig(configJson);

const table = kschema.table("${inTableName}");

${body}
`;