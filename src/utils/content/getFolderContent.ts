import { Dirent, PathLike, readdirSync, readFileSync } from "fs";
import { Uri } from "vscode";
import { TemplatesChannel } from "../../outpuChannel/TemplatesChannel";
import { FolderContentType } from "../../types";
import { showError } from "../vscode";

export const getFolderContent = (uri: Uri): FolderContentType[] => {
    const channel = TemplatesChannel.getChannel();
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

const getFileContent = (path: PathLike) => {
    const channel = TemplatesChannel.getChannel();

    try {
        const content = readFileSync(path, {
            encoding: "utf8"
        });
        return content;
    } catch (error) {
        showError("Something went wrong getting File content");
        channel.appendLine(`Something went wrong getting file content, ${error}`);
        return null;
    }
};