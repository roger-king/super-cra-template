/**
 * Component Generator
 */

import { Actions, PlopGeneratorConfig } from "node-plop";
import path from "path";

import {
  componentExists,
  listComponentsDirectories,
  readSuperConfig,
  toTitleCase,
} from "../utils";

export enum ComponentPromptNames {
  "ComponentName" = "ComponentName",
  "ComponentPath" = "ComponentPath",
  "StyledLibraryImport" = "StyledLibraryImport",
}

export const componentGenerator: PlopGeneratorConfig = {
  description: "Add a display component",
  prompts: [
    {
      type: "input",
      name: ComponentPromptNames.ComponentName,
      message: "What should it be called?",
      default: "Button",
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component with this name already exists"
            : true;
        }

        return "The name is required";
      },
    },
    {
      type: "list",
      name: ComponentPromptNames.ComponentPath,
      message: "Where should it be created ?",
      choices: listComponentsDirectories(),
    },
  ],
  actions: (data: { [P in ComponentPromptNames]: string }) => {
    const componentPath = `${path.join(
      __dirname,
      "../../../",
      data.ComponentPath
    )}/{{properCase ${ComponentPromptNames.ComponentName}}}`;

    const properCaseComponentName = toTitleCase(data.ComponentName);
    const superConfig = readSuperConfig();

    data.StyledLibraryImport = superConfig.styled.import;
    const actions: Actions = [
      {
        type: "add",
        path: `${componentPath}/index.tsx`,
        templateFile: "./component/index.tsx.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${componentPath}/${properCaseComponentName}.tsx`,
        templateFile: "./component/component.tsx.hbs",
        abortOnFail: true,
      },
      // {
      //   type: "add",
      //   path: `${componentPath}/__tests__/index.test.tsx`,
      //   templateFile: "./component/index.test.tsx.hbs",
      //   abortOnFail: true,
      // },
    ];

    actions.push({
      type: "prettify",
      data: { path: `${data.ComponentPath}/${data.ComponentName}/**` },
    });

    return actions;
  },
};
