import * as assert from 'assert';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { getConfiguration } from '../../lib';
import { getWorkspaceUri } from '../../utils/path';
import * as path from 'path';

suite('Extension Test Suite', () => {

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('getConfiguration test', () => {
		const result = getConfiguration('structures');
		assert.strictEqual(result?.[0].name, "DefaultName");
		assert.deepStrictEqual(result?.[0].structure,[
			{
				"name": "DefaultName",
				"withDirectory": true
			}
		] );
	});
	// test('getWorkspaceUri test', async () => {
	// 	vscode.Uri.file(path.join(__dirname + '../../../testworkspace'));


	// 	const result = await getWorkspaceUri();
	// 	assert.ok(result);
	// });
});
