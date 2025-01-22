import { getAllClients, getClient, createClient, updateClient, deleteClient } from '../src/modules/clients/handler/clients';
import { database } from '../src/modules/database-config/database';
import { ResponseModel } from '../src/modules/clients/models/response/response.model';
import { ClientModel } from '../src/modules/clients/models/clients/client.model';

jest.mock('../src/modules/database-config/database', () => ({
    database: {
        scan: jest.fn(),
        get: jest.fn(),
        put: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

jest.mock('../src/modules/clients/models/response/response.model', () => ({
    ResponseModel: {
        ofSuccess: jest.fn(),
        ofError: jest.fn(),
    },
}));

jest.mock('../src/modules/clients/models/clients/client.model', () => ({
    ClientModel: {
        ofEvent: jest.fn(),
    },
}));

describe('Client Handlers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllClients', () => {
        it('should return all clients successfully', async () => {
            const mockItems = [{ id: 1 }, { id: 2 }];
            (database.scan as jest.Mock).mockResolvedValue({ Items: mockItems });
            (ResponseModel.ofSuccess as jest.Mock).mockReturnValue({ success: true });

            const result = await getAllClients();

            expect(database.scan).toHaveBeenCalledWith({
                TableName: process.env.DYNAMODB_TABLE_NAME,
            });
            expect(ResponseModel.ofSuccess).toHaveBeenCalledWith(
                'Successfully retrieved all clients.',
                mockItems
            );
            expect(result.statusCode).toBe(200);
        });

        it('should handle errors when retrieving all clients', async () => {
            const mockError = new Error('Database error');
            (database.scan as jest.Mock).mockRejectedValue(mockError);
            (ResponseModel.ofError as jest.Mock).mockReturnValue({ success: false });

            const result = await getAllClients();

            expect(database.scan).toHaveBeenCalled();
            expect(ResponseModel.ofError).toHaveBeenCalledWith(
                'Failed to retrieve all clients.',
                [],
                mockError.message,
                mockError.stack
            );
            expect(result.statusCode).toBe(500);
        });
    });

    describe('getClient', () => {
        it('should return a client successfully', async () => {
            const mockClient = { id: 1 };
            const mockEvent = { pathParameters: { clientId: '1' } };
            (database.get as jest.Mock).mockResolvedValue({ Item: mockClient });
            (ResponseModel.ofSuccess as jest.Mock).mockReturnValue({ success: true });

            const result = await getClient(mockEvent);

            expect(database.get).toHaveBeenCalledWith({
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Key: { clientId: '1' },
            });
            expect(ResponseModel.ofSuccess).toHaveBeenCalledWith(
                'Successfully retrieved client.',
                mockClient
            );
            expect(result.statusCode).toBe(200);
        });

        it('should handle client not found', async () => {
            const mockEvent = { pathParameters: { clientId: '1' } };
            (database.get as jest.Mock).mockResolvedValue({ Item: null });
            (ResponseModel.ofError as jest.Mock).mockReturnValue({ success: false });

            const result = await getClient(mockEvent);

            expect(ResponseModel.ofError).toHaveBeenCalledWith(
                'Failed to retrieve client.',
                null,
                'Client not found',
                expect.any(String)
            );
            expect(result.statusCode).toBe(404);
        });
    });

    describe('createClient', () => {
        it('should create a client successfully', async () => {
            const mockBody = { id: 1, name: 'John' };
            const mockEvent = { body: JSON.stringify(mockBody) };
            (ClientModel.ofEvent as jest.Mock).mockReturnValue(mockBody);
            (database.put as jest.Mock).mockResolvedValue({});
            (ResponseModel.ofSuccess as jest.Mock).mockReturnValue({ success: true });

            const result = await createClient(mockEvent);

            expect(ClientModel.ofEvent).toHaveBeenCalledWith(mockEvent.body);
            expect(database.put).toHaveBeenCalledWith({
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Item: mockBody,
            });
            expect(result.statusCode).toBe(201);
        });

        it('should handle errors when creating a client', async () => {
            const mockError = new Error('Database error');
            const mockEvent = { body: JSON.stringify({ id: 1 }) };
            (database.put as jest.Mock).mockRejectedValue(mockError);
            (ResponseModel.ofError as jest.Mock).mockReturnValue({ success: false });

            const result = await createClient(mockEvent);

            expect(result.statusCode).toBe(500);
        });
    });

    describe('updateClient', () => {
        it('should update a client successfully', async () => {
            const mockBody = { name: 'Updated Name' };
            const mockEvent = {
                pathParameters: { clientId: '1' },
                body: JSON.stringify(mockBody),
            };
            (ClientModel.ofEvent as jest.Mock).mockReturnValue(mockBody);
            (database.update as jest.Mock).mockResolvedValue({});
            (ResponseModel.ofSuccess as jest.Mock).mockReturnValue({ success: true });

            const result = await updateClient(mockEvent);

            expect(database.update).toHaveBeenCalled();
            expect(result.statusCode).toBe(204);
        });

        it('should handle errors when updating a client', async () => {
            const mockError = new Error('Update error');
            const mockEvent = { pathParameters: { clientId: '1' } };
            (database.update as jest.Mock).mockRejectedValue(mockError);

            const result = await updateClient(mockEvent);

            expect(result.statusCode).toBe(500);
        });
    });

    describe('deleteClient', () => {
        it('should delete a client successfully', async () => {
            const mockEvent = { pathParameters: { clientId: '1' } };
            (database.delete as jest.Mock).mockResolvedValue({});
            (ResponseModel.ofSuccess as jest.Mock).mockReturnValue({ success: true });

            const result = await deleteClient(mockEvent);

            expect(database.delete).toHaveBeenCalledWith({
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Key: { clientId: '1' },
            });
            expect(result.statusCode).toBe(204);
        });

        it('should handle errors when deleting a client', async () => {
            const mockError = new Error('Delete error');
            const mockEvent = { pathParameters: { clientId: '1' } };
            (database.delete as jest.Mock).mockRejectedValue(mockError);

            const result = await deleteClient(mockEvent);

            expect(result.statusCode).toBe(500);
        });
    });
});
