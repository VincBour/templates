import { normalize } from "path";
import { promisify } from "util";
import * as fs from 'fs';
import { FileSettingsType } from "../types";
import { showError } from "../utils/vscode";
import { Position, Uri, WorkspaceEdit } from "vscode";
import { convertFileContentToString, replaceAllVariablesInString } from "../utils/string";

const DEFAULT = 'FCName';

const exists = promisify(fs.exists);

export const createFileOrDirectory = (name: string, targetUri: string = "", wsedit: WorkspaceEdit, withDirectory: boolean = true) => async (fileInstruction: FileSettingsType) => {

    const endFilePath = replaceAllVariablesInString(fileInstruction.name, DEFAULT , name);

    let tempFilePath = withDirectory ? `${targetUri}/${name}/${endFilePath}`: `${targetUri}/${endFilePath}`;

    const filePath = normalize(tempFilePath);

    const isFileExist  = filePath !== "" && await exists(filePath);

    if (isFileExist) {
        showError(`${filePath} already exists. Skipping file`);
        return null;
    }

    const newPath = Uri.file(filePath);
    wsedit.createFile(newPath, {ignoreIfExists: false});

    let template;
    if (typeof fileInstruction.template ==="string") {
        template = fileInstruction.template;
    }

    const fileContent = replaceAllVariablesInString(convertFileContentToString(template), DEFAULT, name);

    wsedit.insert(newPath, new Position(0,0), fileContent);

    if (fileInstruction.template) {
        return newPath;
    }
    return null;
};