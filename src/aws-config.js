import AWS from "aws-sdk";

AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY_SECRET,
});

console.warn("access key: " +  process.env.REACT_APP_AWS_ACCESS_KEY_ID);

const dynamodb = new AWS.DynamoDB.DocumentClient();

export default dynamodb;