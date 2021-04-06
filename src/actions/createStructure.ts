import { normalize } from "path";
import { promisify } from "util";
import * as fs from 'fs';
import { Position, Uri, workspace, WorkspaceEdit } from "vscode";
import { getConfiguration } from "../lib";
import { FileSettingsType } from "../types";
import { showError } from "../utils/vscode";
import { TemplatesChannel } from "../outpuChannel/TemplatesChannel";


export const createStructure = async (name: string, structure: FileSettingsType[] | undefined, targetUri: Uri | undefined) => {
    const channel = TemplatesChannel.getChannel();

    if (structure) {
        //*  create workspaceEdit
        const wsedit = new WorkspaceEdit();
        const fileUris = await Promise.all(
            structure.map(
                //*  manage create file or directory with right name
                createFileOrDirectory(
                    name,
                    `${targetUri?.path}`,
                    wsedit
                )
            )
        );
        
        console.log('fileUris', fileUris);

        try {
            //*  apply Edit in workspace
            await workspace.applyEdit(wsedit);
        } catch (error) {
            showError('Something went wrong during create structure');
            channel.appendLine(`Something went wrong during create structure: ${error}`);
        }
        
        try {        
            //*  manage internaly file modification
            await Promise.all(fileUris.map(openAndSaveFile));
        } catch (error) {
            showError('Something went wrong during create structure');
            channel.appendLine(`Something went wrong during create structure: ${error}`);
        }
    }
};

const openAndSaveFile = async (uri: Uri | null) => {
    if (uri) {
      const document = await workspace.openTextDocument(uri);
      return document.save();
    }
  };

const exists = promisify(fs.exists);

const createFileOrDirectory = (name: string, targetUri: string = "", wsedit: WorkspaceEdit) => async (fileInstruction: FileSettingsType) => {
    const templates = getConfiguration('file');

    const filePath = normalize(`${targetUri}/${name}/${replaceAllVariablesInString(fileInstruction.name, 'FTName', name)}`);

    const isFileExist  = filePath !== "" && await exists(filePath);

    if (isFileExist) {
        showError(`${filePath} already exists. Skipping file`);
        return null;
    }

    if (fileInstruction.template === "EmptyDirectory") {
        fs.mkdirSync(filePath, { recursive: true });
        return null;
    }

    const newPath = Uri.file(filePath);
    wsedit.createFile(newPath, {ignoreIfExists: false});

    let template;
    if (typeof fileInstruction.template ==="string") {
        template = fileInstruction.template;
    }

    const fileContent = replaceAllVariablesInString(convertFileContentToString(template), 'FTName', name);

    wsedit.insert(newPath, new Position(0,0), fileContent);

    if (fileInstruction.template) {
        return newPath;
    }
    return null;
};
const convertFileContentToString = (content: string[] | string | undefined) => {
    if (!content) {
      return "";
    }
    const result = Array.isArray(content) ? content.join("\n") : content;
    return result;
  };

const replaceAllVariablesInString = (
    target: string,
    value: string,
    replaceValue: string
) => {
    const result = target.replace(getReplaceRegexp(value), replaceValue);
    return result;
};

const getReplaceRegexp = (variableName: string) => {
    //finds <variableName( (| or %) transformer)> and  [variableName( (| or %) transformer)] in strings
    const regexp = new RegExp(
      `(?:<|\\[)${variableName}\\s*(?:\\s*(?:\\||\\%)\\s*([A-Za-z\?]+)\\s*?)?(?:>|\\])`,
      "g"
    );
  
    return regexp;
  };