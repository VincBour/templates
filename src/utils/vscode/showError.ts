import { window } from "vscode";

export const showError = (message: string) => window.showErrorMessage(message);