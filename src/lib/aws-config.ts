import AWS from "aws-sdk";

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:87ee00f8-14fd-4750-9093-d849eacaaee4',
  }),
});

export const initAWS = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (AWS.config.credentials)
    {
      (AWS.config.credentials as AWS.CognitoIdentityCredentials).get((err) => {
        if (err) {
          console.error("Error retrieving AWS credentials:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      reject(new Error("No AWS credentials configured"));
    }
  });

export const dynamodb = new AWS.DynamoDB.DocumentClient();