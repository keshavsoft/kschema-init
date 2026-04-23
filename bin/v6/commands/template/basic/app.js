import { kschema } from "@keshavsoft/kschema";
import consfigJson from './config.json' with { type: 'json' };

kschema.loadConfig(consfigJson);