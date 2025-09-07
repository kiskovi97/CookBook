import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

export const dynamodb = DynamoDBDocument.from(new DynamoDB({ 
  region: 'us-east-1',
  credentials: fromCognitoIdentityPool({
    //identityPoolId: 'us-east-1:87ee00f8-14fd-4750-9093-d849eacaaee4', -- OLD READONLY
    identityPoolId: "us-east-1:b297876b-aa27-413a-b00f-67d5904bfb9d"
  }),
}));