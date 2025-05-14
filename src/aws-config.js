import AWS from "aws-sdk";

AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY_SECRET,
});

console.warn("access key: " +  process.env.REACT_APP_AWS_ACCESS_KEY_ID);

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