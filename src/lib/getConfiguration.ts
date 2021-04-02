import { workspace } from "vscode";

export const getConfiguration = (target: string) => {
    const configuration = workspace.getConfiguration('fctemplates');
    return configuration.get(target);
};