import { Uri } from "vscode";
import { createStructure } from "../actions/createStructure";
import { getComponentName, getConfiguration, getTargetUri, getTemplates, pickTemplate, pickTemplateName } from "../lib";
import { TemplatesChannel } from "../outpuChannel/TemplatesChannel";
import { FolderType } from "../types";
import { showError, showInfo } from "../utils/vscode";

export const folderCreatorStructure = async (resource: Uri | string | undefined, templatesFolderPath: string) => {
    const channel = TemplatesChannel.getChannel();
    
    console.log('folderCreatorStructure', resource, templatesFolderPath);
    //* getParentFolder From resource
    const targetUri = await getTargetUri(resource);
    channel.appendLine('get target uri ok');
    console.log('targetUri', targetUri);

    //* get Configuration of structures from settings
    const configurations = getConfiguration("structures") || [];
    channel.appendLine('get structure configuration ok');
    console.log('configurations', configurations);

    //* get All Templates available
    const templatesAvailable = getTemplates(templatesFolderPath).concat(configurations as FolderType[]);
    console.log('templatesAvailable', templatesAvailable);
    if (!templatesAvailable.length) {
        showError("No configured Folder Template Found !");
    }

    //*  choose the template
    const templateName = await pickTemplateName(templatesAvailable);
    console.log('templateName', templateName);
    if (!templateName) {
        showError("Something went wrong, No template name selected !!");
    }

    const template = pickTemplate(templatesAvailable, templateName);
    console.log('template', template);
    if (!template) {
        showError('Something went wrong, No template selcted !!');
    }

    //* choose Name for the structure
    const name = await getComponentName();
    console.log('name', name);
    //*  manage message error if name is undefined

    //*  create structure
    await createStructure(
        name!,
        template?.structure!,
        targetUri!
    );

    showInfo("Creation Folder Done");
};
