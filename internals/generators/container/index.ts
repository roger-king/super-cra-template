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
    const containerPath = `${path.join(
      __dirname,
      "../../../src/app/containers"
    )}/{{properCase ${ContainerPromptNames.ContainerName}}}`;

    const properCaseContainerName = toTitleCase(data.ContainerName);
    const superConfig = readSuperConfig();

    data.StyledLibraryImport = superConfig.styled.import;
    const actions: Actions = [
      {
        type: "add",
        path: `${containerPath}/index.tsx`,
        templateFile: "./container/index.tsx.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${containerPath}/${properCaseContainerName}.tsx`,
        templateFile: "./container/container.tsx.hbs",
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
