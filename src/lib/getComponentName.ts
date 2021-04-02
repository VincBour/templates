import { window } from "vscode";

export const getComponentName = async (): Promise<string | undefined> => {
    let prompt = `Enter the name of your new component`;
    let value;
    const inputValue = await window.showInputBox({
        prompt,
        value
    });

    return inputValue;
};