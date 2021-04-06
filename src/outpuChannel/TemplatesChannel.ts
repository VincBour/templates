import { OutputChannel, window } from "vscode";

export class TemplatesChannel {
    private static instance: TemplatesChannel;
    private static channel: OutputChannel;

    constructor() { }

    public static getChannel(): OutputChannel {
        if (!this.channel) {
            TemplatesChannel.instance = new TemplatesChannel();
            this.channel = window.createOutputChannel('Templates');
        }
        return this.channel;
    }
}