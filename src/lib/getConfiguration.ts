import { workspace } from "vscode";
import { FolderType } from "../types";

export const getConfiguration = (target: string): FolderType[] | undefined => {
    const configuration = workspace.getConfiguration('fctemplates');
    console.log('getConfiguration', configuration);
    return configuration.get(target);
};