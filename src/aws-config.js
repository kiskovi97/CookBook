import AWS from "aws-sdk";

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  }),
});

export const initAWS = () =>
  new Promise((resolve, reject) => {
    AWS.config.credentials.get((err) => {
      if (err) {
        console.error('Error retrieving AWS credentials:', err);
        reject(err);
      } else {
        console.log('AWS credentials loaded:', AWS.config.credentials);
        resolve();
      }
    });
  });

export const dynamodb = new AWS.DynamoDB.DocumentClient();