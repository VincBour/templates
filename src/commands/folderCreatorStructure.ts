import { Uri } from "vscode";
import { createStructure } from "../actions/createStructure";
import { getComponentName, getConfiguration, getTargetUri, getTemplates, pickTemplate, pickTemplateName } from "../lib";
import { showInfo } from "../utils/vscode";

export const folderCreatorStructure = async (resource: Uri | string | undefined, templatesFolderPath: string) => {
    //* TODO getParentFolder From resource
    const targetUri = await getTargetUri(resource);

    //* TODO get Configuration of structures from settings
    const configurations = getConfiguration("structure") || [];

    //* TODO get All Templates available
    const templatesAvailable = getTemplates(templatesFolderPath);

    //* TODO choose the template
    const templateName = await pickTemplateName(templatesAvailable);
    const template = pickTemplate(templatesAvailable, templateName);

    // TODO manage message error if templateName or template is null or undefined

    //* choose Name for the structure
    const name = await getComponentName();

    // TODO manage message error if name is undefined

    //* TODO create structure
    await createStructure(
        name!,
        template.structure,
        targetUri
    );

    showInfo("Creation Folder Done");
};
