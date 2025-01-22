export class ResponseModel {
    message: string;
    content: any;
    statusCode: number;
    errorMessage?: string;
    errorBuild?: string;

    constructor(message: string, content: any, errorMessage?: string, errorBuild?: string) {
        this.message = message;
        this.content = content;
        this.errorMessage = errorMessage;
        this.errorBuild = errorBuild;
    }

    static ofSuccess(message: string, content: any): ResponseModel {
        return new ResponseModel(message, content);
    }

    static ofError(message: string, content: any, errorMessage: string, errorBuild: string): ResponseModel {
        return new ResponseModel(message, content, errorMessage, errorBuild);
    }

}
