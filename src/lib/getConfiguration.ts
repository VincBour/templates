import { workspace } from "vscode";
import { FolderType } from "../types";

export const getConfiguration = (target: string): FolderType[] | undefined => {
    const configuration = workspace.getConfiguration('fctemplates');
    return configuration.get(target);
};