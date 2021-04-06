import { PathLike } from "fs";
import { readdirSync } from "fs";
import { Uri } from "vscode";
import { FolderType } from "../types";
import { contentToStructure } from "../utils/content/contentToStructure";
import { getFolderContent } from "../utils/content/getFolderContent";

export const getTemplates = (path: PathLike): FolderType[] => {
    //*  read directory
    const templates = readdirSync(path, { withFileTypes: true });
    console.log('getTemplates templates', templates);
    //* filter by isDirectory
    const filterTemplates = templates.filter(f => f.isDirectory());
    console.log('getTemplates filterTemplates', filterTemplates);
    const result = filterTemplates.map(file => {
        const uri = `${path}/${file.name}`;
        
        //* get directory content
        const contents = getFolderContent(Uri.parse(uri));
        console.log('getTemplates contents', contents);
        //*  transform content to structure
        const structure = contentToStructure(contents, `${uri}`);
        console.log('getTemplates structure', structure);
        return {
            name: file.name,
            structure
        };
    });
    
    return result;
};

