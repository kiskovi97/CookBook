import AWS from "aws-sdk";

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:87ee00f8-14fd-4750-9093-d849eacaaee4',
  }),
});

export const initAWS = () =>
  new Promise((resolve, reject) => {
    AWS.config.credentials.get((err) => {
      if (err) {
        console.error('Error retrieving AWS credentials:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });

export const dynamodb = new AWS.DynamoDB.DocumentClient();