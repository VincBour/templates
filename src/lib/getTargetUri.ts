import { Uri, window, workspace } from "vscode";
import { getWorkspaceUri } from "../utils/path";
import { showError } from "../utils/vscode";

export const getTargetUri = async (targetDirectory: Uri | string | undefined) => {
    //* get workspace uri
    let workspaceUri: Uri | undefined = await getWorkspaceUri();
    console.log("workspaceUri", workspaceUri);
    if (!workspaceUri) {
        showError('Workspace not found');
        return;
    }
    
    //* manage if resource is String
    if (typeof targetDirectory === 'string') {
        if (targetDirectory === '__current') {
            return getParentDirectoryPath();
        }

        return Uri.parse(`${workspaceUri}/${targetDirectory}`);
    }

    //* manage if resource is undefined
    if (!targetDirectory && workspace.workspaceFolders) {
        const directoryPath = await window.showInputBox({
            placeHolder: "Enter the relative path to project root where your folder should be created"
        });
        return Uri.parse(`${workspaceUri}/${directoryPath}`, true);
    }

    return targetDirectory;
};

// TODO To be tested
function getParentDirectoryPath() {
    const activeTextEditor = window.activeTextEditor;
    const document = activeTextEditor?.document;
    const uri = document?.uri?.toString();
    const currentDirectoryUri = uri?.replace(/\/([^/]+)$/, "");

    if (!currentDirectoryUri) {
        return null;
    }
    console.log("currentDirectoryUri", currentDirectoryUri);
    return Uri.parse(currentDirectoryUri, true);
}



