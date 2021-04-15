import { PathLike, readFileSync } from "fs";
import { channel } from "../../outpuChannel/TemplatesChannel";
import { showError } from "../vscode";

export const getFileContent = (path: PathLike) => {
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