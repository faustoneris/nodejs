import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    // convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: true // false, by default. <---- Set this flag
  }

  const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    // wrapNumbers: false, // false, by default.
  }

  const translateConfig = { marshallOptions, unmarshallOptions }


const options = {
    region: "us-east-1",
    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    //add secretes here
}
export const dynamodb = new DynamoDB(options);
export const database = DynamoDBDocument.from(new DynamoDB(options), translateConfig);




