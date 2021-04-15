import { PathLike } from "fs";
import { readdirSync } from "fs";
import { Uri } from "vscode";
import { FolderType } from "../types";
import { contentToStructure } from "../utils/content/contentToStructure";
import { getFolderContent } from "../utils/content/getFolderContent";

export const getTemplates = (path: PathLike): FolderType[] => {
    
    const templates = readdirSync(path, { withFileTypes: true });
    
    const filterTemplates = templates.filter(f => f.isDirectory());
    
    const result = filterTemplates.map(file => {
        const uri = `${path}/${file.name}`;
        
        const contents = getFolderContent(Uri.parse(uri));
        
        const structure = contentToStructure(contents, `${uri}`);
        
        return {
            name: file.name,
            structure
        };
    });
    
    return result;
};

