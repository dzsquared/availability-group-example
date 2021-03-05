'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

import * as azdata from 'azdata';

import { promises } from 'fs';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "availability-group-tab" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('availability-group-tab.helloWorld', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    }));

    // context.subscriptions.push(vscode.commands.registerCommand('availability-group-tab.showCurrentConnection', () => {
    //     // The code you place here will be executed every time your command is executed

    //     // Display a message box to the user
    //     azdata.connection.getCurrentConnection().then(connection => {
    //         let connectionId = connection ? connection.connectionId : 'No connection found!';
    //         vscode.window.showInformationMessage(connectionId);
    //     }, error => {
    //          console.info(error);
    //     });
    // }));

    
    azdata.tasks.registerTask('availability-group-tab.alwayson-health-events', e => showQueryWindow(e, 'alwayson-health-events.sql'));
}

// this method is called when your extension is deactivated
export function deactivate() {
}

async function showQueryWindow(connection: azdata.IConnectionProfile, fileName: string): Promise<void> {
    let sqlContent: string = await promises.readFile(path.join(__dirname, '..', 'sql', fileName), { encoding: 'utf8' });
    await vscode.commands.executeCommand('newQuery');

    let editor = vscode.window.activeTextEditor;
    if (editor) {
        let doc = editor.document;
        editor.edit(edit => {
            edit.insert(new vscode.Position(0, 0), sqlContent);
        });
    }
}