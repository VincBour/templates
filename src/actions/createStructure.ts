import { Uri, workspace, WorkspaceEdit } from "vscode";
import { FileSettingsType } from "../types";
import { showError, showInfo } from "../utils/vscode";
import { channel } from "../outpuChannel/TemplatesChannel";
import { createFileOrDirectory } from "./createFileOrDirectory";
import { openAndSaveFile } from "./openAndSaveFile";

export const createStructure = async (name: string, structure: FileSettingsType[] | undefined, targetUri: Uri | undefined, withDirectory: boolean) => {
    
    if (structure) {
        const wsedit = new WorkspaceEdit();
        const fileUris = await Promise.all(
            structure.map(
                createFileOrDirectory(
                    name,
                    `${targetUri?.path}`,
                    wsedit,
                    withDirectory
                )
            )
        );

        try {
            await workspace.applyEdit(wsedit);
        } catch (error) {
            showError('Something went wrong during create structure', false);
            channel.appendLine(`Something went wrong during create structure: ${error}`);
        }
        
        try {        
            await Promise.all(fileUris.map(openAndSaveFile));
            showInfo("Creation Done");
        } catch (error) {
            showError('Something went wrong during create structure', false);
            channel.appendLine(`Something went wrong during create structure: ${error}`);
        }
    }
};