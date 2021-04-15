import * as fs from 'fs';
import * as path from 'path';
import { Uri, window, workspace } from "vscode";
import { channel } from '../outpuChannel/TemplatesChannel';
import { getWorkspaceUri } from "../utils/path";
import { showError } from "../utils/vscode";

export const getTargetUri = async (targetDirectory: Uri | string | undefined) => {
    
    let workspaceUri: Uri | undefined = await getWorkspaceUri();
    if (!workspaceUri) {
        showError('Workspace not found');
        return;
    }
    
    if (typeof targetDirectory === 'string') {
        if (targetDirectory === '__current') {
            return getParentDirectoryPath();
        }

        return Uri.parse(`${workspaceUri}/${targetDirectory}`);
    }

    if (!targetDirectory && workspace.workspaceFolders) {

        const actualDocumentScope = window.activeTextEditor?.document;

        let newFolder = '';
        if (actualDocumentScope) {   
            const folderPath = actualDocumentScope?.uri.path;
            const isDirectory = isFolderExist(folderPath!);
            if (!isDirectory) {
                const nameFile = path.basename(folderPath!);
                const replaceValue = '/'+nameFile;
                newFolder = folderPath?.replace(replaceValue, '')!;
            }

            const inThisDirectory = await window.showInputBox({
                placeHolder: 'Y or N',
                prompt: `Do you want to create the component in this folder: ${path.basename(newFolder)} ? Y/N`,
                validateInput: (value: string) => {
                    if (!value || value.trim().length === 0 || (value.toUpperCase() !== 'Y' && value.toUpperCase() !== 'N')) {
                        return 'Cannot set empty or not valid value (Y or N)';
                    }
                    return null;
                }
            });
            
            if (inThisDirectory === 'Y' || inThisDirectory === 'y') {
                return Uri.parse(newFolder);
            }
        }
        
        const directoryPath = await window.showInputBox({
            placeHolder: "Enter the relative path to project root where your folder should be created"
        });
        return Uri.parse(`${workspaceUri}/${directoryPath}`, true);
    }

    return targetDirectory;
};

function getParentDirectoryPath() {
    const activeTextEditor = window.activeTextEditor;
    const document = activeTextEditor?.document;
    const uri = document?.uri?.toString();
    const currentDirectoryUri = uri?.replace(/\/([^/]+)$/, "");

    if (!currentDirectoryUri) {
        return null;
    }
    channel.appendLine(`current directory: ${currentDirectoryUri}`);
    return Uri.parse(currentDirectoryUri, true);
}

function isFolderExist(path: string) {
    try {
        fs.readdirSync(path);
        return true;
    } catch (error) {
        return false;
    }
}

