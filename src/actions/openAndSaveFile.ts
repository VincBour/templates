import { Uri, workspace } from "vscode";

export const openAndSaveFile = async (uri: Uri | null) => {
    if (uri) {
      const document = await workspace.openTextDocument(uri);
      return document.save();
    }
};