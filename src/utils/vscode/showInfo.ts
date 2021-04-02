import { window } from "vscode";

export const showInfo = (message: string) => window.showInformationMessage(message);