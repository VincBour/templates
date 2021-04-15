import { Uri } from "vscode";
import { createStructure } from "../actions/createStructure";
import { getComponentName, getConfiguration, getTargetUri, getTemplates, pickTemplate, pickTemplateName } from "../lib";
import { channel } from "../outpuChannel/TemplatesChannel";
import { showError, showInfo } from "../utils/vscode";

export const folderCreatorStructure = async (resource: Uri | string | undefined, templatesFolderPath: string) => {
    
    const targetUri = await getTargetUri(resource);
    channel.appendLine('get target uri => ok');

    const configurations = getConfiguration("structures") || [];
    channel.appendLine('get structure configuration => ok');

    const templatesAvailable = getTemplates(templatesFolderPath);
    if (!templatesAvailable.length) {
        showError("No configured Folder Template Found !");
    }
    channel.appendLine('get folder template => ok');

    const templateName = await pickTemplateName(templatesAvailable);
    if (!templateName) {
        showError("Something went wrong, No template name selected !!");
    }
    channel.appendLine(`pick template name => ${templateName}`);

    const configurationTemplate = configurations.find(c => c.name === templateName);

    const template = pickTemplate(templatesAvailable, templateName);
    if (!template) {
        showError('Something went wrong, No template selected !!');
    }
    channel.appendLine(`pick template => ok`);

    const name = await getComponentName();
    if (!name) {
        showError('Something went wrong, No Component Name Selected !!');
    }
    channel.appendLine(`get Component Name => ${name}`);

    await createStructure(
        name!,
        template?.structure!,
        targetUri!,
        configurationTemplate?.withDirectory!
    );
};
