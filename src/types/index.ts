export type FolderType = {
    name: string;
    structure: FileSettingsType[];
    withDirectory?: boolean;
};

export type FileSettingsType = {
    name: string;
    template?: string | string[]
};

export type FolderContentType =  {
    filePath: string;
    content: string | null;
};
