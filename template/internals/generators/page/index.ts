/**
 * Page Generator
 */

import { Actions, PlopGeneratorConfig } from "node-plop";
import path from "path";

import { pageExists, readSuperConfig, toTitleCase } from "../utils";

export enum PagePromptNames {
  "PageName" = "PageName",
  "PagePath" = "PagePath",
  "StyledLibraryImport" = "StyledLibraryImport",
  "PageUrl" = "PageUrl",
  "LazyLoad" = "LazyLoad",
  "PageProtected" = "PageProtected",
  "PageRoute" = "PageRoute",
}

export const pageGenerator: PlopGeneratorConfig = {
  description: "Add a new page",
  prompts: [
    {
      type: "input",
      name: PagePromptNames.PageName,
      message: "What should it be called?",
      default: "Home",
      validate: (value) => {
        if (/.+/.test(value)) {
          return pageExists(value)
            ? "A Page with this name already exists"
            : true;
        }

        return "The name is required";
      },
    },
    {
      type: "input",
      name: PagePromptNames.PageUrl,
      message: "What is the page url?",
      default: "/",
    },
    {
      type: "input",
      name: PagePromptNames.LazyLoad,
      message: "Do you want to load the component asynchronously?",
      default: false,
    },
    {
      type: "input",
      name: PagePromptNames.PageProtected,
      message: "Is this page protected by authentication?",
      default: false,
    },
  ],
  actions: (data: { [P in PagePromptNames]: any }) => {
    const rootPagePath = path.join(__dirname, `../../../src/app/pages`);
    const pagePath = `${path.join(rootPagePath)}/{{properCase ${
      PagePromptNames.PageName
    }}}`;

    const properCasePageName = toTitleCase(data.PageName);
    const superConfig = readSuperConfig();

    data.StyledLibraryImport = superConfig.styled.import;
    data.PageRoute = {
      path: data.PageUrl,
      component: toTitleCase(data.PageName),
      lazy: data.LazyLoad,
      protected: data.PageProtected,
    };

    const actions: Actions = [
      {
        type: "add",
        path: `${pagePath}/index.tsx`,
        templateFile: "./page/index.tsx.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${pagePath}/${properCasePageName}.tsx`,
        templateFile: "./page/page.tsx.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: `${rootPagePath}/index.tsx`,
        transform(fileContents, data) {
          let pageRoute = fileContents.replace(
            /\/\/ DO NOT DELETE - page_import here/g,
            `\/\/ DO NOT DELETE - page_import here\n${JSON.stringify(
              data.PageRoute
            )}`
          );

          return pageRoute.replace();
        },
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
      data: { path: `${data.PagePath}/${data.PageName}/**` },
    });

    return actions;
  },
};
