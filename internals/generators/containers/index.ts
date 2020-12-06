/**
 * Container Generator
 */

import { Actions, PlopGeneratorConfig } from "node-plop";
import path from "path";

import { containerExists, readSuperConfig, toTitleCase } from "../utils";

export enum ContainerPromptNames {
  "ContainerName" = "ContainerName",
  "ContainerPath" = "ContainerPath",
  "StyledLibraryImport" = "StyledLibraryImport",
}

export const containerGenerator: PlopGeneratorConfig = {
  description: "Add a display component",
  prompts: [
    {
      type: "input",
      name: ContainerPromptNames.ContainerName,
      message: "What should it be called?",
      default: "Home",
      validate: (value) => {
        if (/.+/.test(value)) {
          return containerExists(value)
            ? "A container with this name already exists"
            : true;
        }

        return "The name is required";
      },
    },
  ],
  actions: (data: { [P in ContainerPromptNames]: string }) => {
    const componentPath = `${path.join(
      __dirname,
      "../../../",
      data.ContainerPath
    )}/{{properCase ${ContainerPromptNames.ContainerName}}}`;

    const properCaseComponentName = toTitleCase(data.ContainerName);
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
      data: { path: `${data.ContainerPath}/${data.ContainerName}/**` },
    });

    return actions;
  },
};
