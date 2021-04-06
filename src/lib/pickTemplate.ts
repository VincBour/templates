import { FolderType } from "../types";
import { showError } from "../utils/vscode";

export const pickTemplate = (templates: FolderType[], name: string = "default") => {
    let directoryStructure: FolderType | undefined;
    //*  find template with name
    if (name !== "default") {
        directoryStructure = templates.find(t => t.name === name);
        if (!directoryStructure) {
            showError("Could'nt find selected structure, please try again");
            return null;
        }
        return directoryStructure;
    }
    //*  find template with "default"
    directoryStructure = templates[0];

    if (!directoryStructure) {
        showError("Something went wrong, could'nt find folder structure");
        return null;
    }

    return directoryStructure;
};