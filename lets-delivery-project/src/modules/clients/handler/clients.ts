import { database } from '../../database-config/database';
import { ClientModel } from '../models/clients/client.model';
import { ResponseModel } from '../models/response/response.model';

export const getAllClients = async () => {
    let response: ResponseModel;

    try {
        const { Items } = await database.scan({ TableName: process.env.DYNAMODB_TABLE_NAME });

       response = ResponseModel.ofSuccess("Successfully retrieved all clients.",
            Items && Items.length > 0 ? Items.map((item) => item) : []);
    } catch (e) {
        console.error(e);
        response = ResponseModel.ofError("Failed retrieved all clients.", [], e.message, e.stack);
        return {
            statusCode: 500,
            body: JSON.stringify(response)
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};

export const getClient = async (event) => {
    let response: ResponseModel;
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: { clientId: event.pathParameters!.clientId },
        };
        const item = await database.get(params);
        if (item.Item == null) {
            throw new Error();
        }
        response = ResponseModel.ofSuccess("Successfully retrieved client", item.Item);
    } catch (e) {
        console.error(e);
        response = ResponseModel.ofError("Failed to get client.", null, e.message, e.stack);
        return {
            statusCode: 201,
            body: JSON.stringify(response)
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};

export const createClient = async (event) => {
    let response: ResponseModel;
    try {
        const body = ClientModel.ofEvent(event.body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: body,
        };
        const createResult = await database.put(params);

       response = ResponseModel.ofSuccess("Successfully create client", createResult);
    } catch (e) {
        console.error(e);
        response = ResponseModel.ofError("Failed to create client.", null, e.message, e.stack);
        return {
            statusCode: 500,
            body: JSON.stringify(response)
        };
    }
    return {
        statusCode: 201,
        body: JSON.stringify(response)
    };
};

export const updateClient = async (event) => {
    let response: ResponseModel;

    try {
        const body = ClientModel.ofEvent(event);
        const objKeys = Object.keys(body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: { clientId: event.pathParameters.clientId },
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`]: key,
            }), {}),
            ExpressionAttributeValues: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`]: body[key],
            }), {}),
        };
        const updateResult = await database.update(params);

        response = ResponseModel.ofSuccess("Successfully updated client.", updateResult);
    } catch (e) {
        console.error(e);
        response = ResponseModel.ofError("Failed to get client.", null, e.message, e.stack);
        return {
            statusCode: 500,
            body: JSON.stringify(response)
        };
    }

    return {
        statusCode: 204,
        body: JSON.stringify(response)
    };
};

export const deleteClient = async (event) => {
    let response: ResponseModel;

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: { clientId: event.pathParameters.clientId },
        };
        const deleteResult = await database.delete(params);

        response = ResponseModel.ofSuccess("Successfully delete client.", deleteResult);
    } catch (e) {
        console.error(e);
        response = ResponseModel.ofError("Failed delete client.", null, e.message, e.stack);
        return {
            statusCode: 500,
            body: JSON.stringify(response)
        };
    }
    return {
        statusCode: 204,
        body: JSON.stringify(response)
    };
};
