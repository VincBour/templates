import { window } from "vscode";
import { channel } from "../../outpuChannel/TemplatesChannel";

export const showError = (message: string, hasChannel: boolean = true) => {
    if (hasChannel) {
        channel.appendLine(message);
    }  
    return window.showErrorMessage(message);
};