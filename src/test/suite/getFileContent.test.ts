import * as vscode from 'vscode';
import { before } from "mocha";
import { getFileContent} from '../../utils/content';
import * as chai from "chai";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);
chai.should();

suite('getFileContent', () => {
    const path =  vscode.workspace.workspaceFolders?.[0].uri.fsPath+'/testworkspace/workspace/components/fileContent.ts';
    before(()=> {
        vscode.window.showInformationMessage("Start all tests.");
    });
    test('should return content', () => {
        
        const result = getFileContent(`${path}`);
    });
});