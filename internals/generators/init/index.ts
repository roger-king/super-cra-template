/**
 * Super CRA Config Generator
 */

import { Actions, PlopGeneratorConfig } from "node-plop";
import { superConfigExists } from "../utils";
import path from "path";
import { rm } from "fs";
import rimraf from "rimraf";

export enum ConfigPromptNames {
  "styled" = "StyledLibrary",
  "styledLibraryImport" = "StyledLibraryImport",
}

const supportedStyledLibraries = ["styled-components", "emotion"];

export const initGenerator: PlopGeneratorConfig = {
  description: "Setup the configuration for super templates",
  prompts: [
    {
      type: "list",
      name: ConfigPromptNames.styled,
      message: "What styled component library would you like to use?",
      choices: supportedStyledLibraries,
    },
  ],
  actions: (data: { [P in ConfigPromptNames]: string }) => {
    const superConfigPath = path.join(__dirname, "..");

    switch (data.StyledLibrary) {
      case "styled-components":
        data.StyledLibraryImport = "styled-components";
        break;
      case "emotion":
        data.StyledLibraryImport = "@emotion/styled";
        break;
    }

    if (superConfigExists()) {
      console.log("overwriting config");
      rimraf.sync(`${superConfigPath}/superconfig.json`);
    }

    const actions: Actions = [
      {
        type: "add",
        path: `${superConfigPath}/superconfig.json`,
        templateFile: "./init/superconfig.json.hbs",
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
