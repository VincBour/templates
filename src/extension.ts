// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { folderCreatorStructure } from './commands/folderCreatorStructure';
import { showInfo } from './utils/vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "templates" is now active!');

	const templateFolderPath = context.asAbsolutePath('.templates');
	console.log('templateFolderPath', templateFolderPath);
	let createFolder = vscode.commands.registerCommand(
		"templates.folderCreation",
		(resource) => {
			showInfo('templates folderCreation is working');
			return folderCreatorStructure(resource, templateFolderPath);
		}
		
	);
	context.subscriptions.push(createFolder);
}

// this method is called when your extension is deactivated
export function deactivate() {}
