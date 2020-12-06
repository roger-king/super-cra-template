/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

import fs from "fs";
import path from "path";

export function componentExists(component: string) {
  const components = fs.readdirSync(
    path.join(__dirname, "../../../src/app/components")
  );
  return components.indexOf(component) >= 0;
}

export function superConfigExists() {
  return fs.existsSync(path.join(__dirname, "../superconfig.json"));
}

export function containerExists(container: string) {
  const containers = fs.readdirSync(
    path.join(__dirname, "../../../src/app/containers")
  );
  return containers.indexOf(container) >= 0;
}

export function pageExists(page: string) {
  const pages = fs.readdirSync(path.join(__dirname, "../../../src/app/pages"));
  return pages.indexOf(page) >= 0;
}

function walkDir(directory: string) {
  let dirList: string[] = [];

  const files = fs.readdirSync(directory);
  for (const file of files) {
    const p = path.join(directory, file);
    if (fs.statSync(p).isDirectory()) {
      dirList.push(p);
      dirList = [...dirList, ...walkDir(p)];
    }
  }
  return dirList;
}

export function listComponentsDirectories() {
  // Not using path.join(__dirname,) as it give really long name when listed
  const sourceDir = "src/";
  return walkDir(sourceDir).filter((dirPath) => dirPath.match(/components$/));
}

interface SuperConfig {
  styled: { name: string; import: string };
}

export function readSuperConfig(): SuperConfig {
  const config = require("../superconfig.json");
  return config;
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
