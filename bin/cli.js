#!/usr/bin/env node
console.log("baaaaaaaaaaaa : ");

import packageJson from "../package.json" with { type: "json" };

import { v2Func } from "./v2/start.js";
console.log("bbbbbbbbbbbbbbb : ", packageJson);

switch (packageJson?.version.split(".")[1]) {
    case "2":
        v2Func();

        break;

    default:
        console.log("Usage: kschema <init|test> [name]");
};