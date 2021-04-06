import { Uri, window, workspace } from "vscode";

export const getWorkspaceUri = async (): Promise<Uri | undefined> => {
    const numberOfWorkspaceFolder = workspace.workspaceFolders?.length || 0;
    if (numberOfWorkspaceFolder > 1) {
        const targetDirectory = await window.showWorkspaceFolderPick({
            placeHolder: "Select Worspace in wich you want to create the folder"
        });
        return targetDirectory?.uri;
    }
    return workspace.workspaceFolders?.[0]?.uri;
};