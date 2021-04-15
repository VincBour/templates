import { Dirent, PathLike, readdirSync, readFileSync } from "fs";
import { Uri } from "vscode";
import { channel } from "../../outpuChannel/TemplatesChannel";
import { FolderContentType } from "../../types";
import { showError } from "../vscode";
import { getFileContent } from "./getFileContent";

export const getFolderContent = (uri: Uri): FolderContentType[] => {
    try {
        const files = readdirSync(uri.fsPath, { withFileTypes: true });
        const allPath: FolderContentType[] = files.reduce((prev: FolderContentType[], curr: Dirent) => {
            if (curr.isDirectory()) {
                return [...prev, ...getFolderContent(Uri.joinPath(uri, curr.name))];
            }
            return [...prev, {
                filePath: Uri.joinPath(uri, curr.name).fsPath,
                content: getFileContent(`${uri.fsPath}/${curr.name}`)
            }];
        }, []);
        
        return allPath;

    } catch (error) {
        showError("Something went wrong getting Folder content");
        channel.appendLine(`Something went wrong getting folder content, ${error}`);
        return [];
    }
};