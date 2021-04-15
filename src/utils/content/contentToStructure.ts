import { relative } from 'path';
import { FileSettingsType, FolderContentType } from "../../types";

export const contentToStructure = (contents: FolderContentType[], uri: string) => {
  const result: FileSettingsType[] = contents.map(content => {
      return {
          name: relative(uri, content.filePath),
          template: content.content || ""
      };
  });
  return result;
};