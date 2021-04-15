import { window } from "vscode";
import { channel } from "../../outpuChannel/TemplatesChannel";

export const showInfo = (message: string, hasChannel: boolean = true) => {
    if (hasChannel) {
        channel.appendLine(message);
    }  
    return window.showInformationMessage(message);
};