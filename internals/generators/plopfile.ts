import { NodePlopAPI } from "node-plop";
import { componentGenerator } from "./component";
import { pageGenerator } from "./page";
import { initGenerator } from "./init";
import shell from "shelljs";
import { superConfigExists } from "./utils";

interface CustomActionData {
  path: string;
  file?: string;
}

/**
 * Every generated backup file gets this extension
 */
export const BACKUPFILE_EXTENSION = "rbgen";

export default function plop(plop: NodePlopAPI) {
  if (superConfigExists()) {
    plop.setGenerator("component", componentGenerator);
    plop.setGenerator("page", pageGenerator);
  } else {
    plop.setGenerator("init", initGenerator);
  }

  plop.setActionType("prettify", (answers, config) => {
    const data = config.data as CustomActionData;
    shell.exec(`yarn run prettify -- "${data.path}"`, { silent: true });
    return "";
  });
}
