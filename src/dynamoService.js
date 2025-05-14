import { dynamodb, initAWS } from "./aws-config.js";

export const fetchData = async () =>
{
    await initAWS();
    
    const params = {
        TableName: "Dishes",
    }

    try {
        const data = await dynamodb.scan(params).promise();
        return { success: true, data: data.Items };
    } catch(error)
    {
        return {success: false, message: error.message};
    }
}