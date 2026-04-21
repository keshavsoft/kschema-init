#!/usr/bin/env node

import packageJson from "../package.json" with { type: "json" };

import { v2Func } from "./v2/start.js";
import { v3Func } from "./v3/start.js";

switch (packageJson?.cliVersion) {
    case "2":
        v2Func();

        break;
    case "3":
        v3Func();

        break;

    default:
        console.log(`Unsupported CLI version: ${packageJson?.cliVersion}`);
        console.log("Usage: kschema <init|test> [name]");
};