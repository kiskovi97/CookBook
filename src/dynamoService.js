import { dynamodb, initAWS } from "./aws-config.js";
import { v4 as uuidv4 } from 'uuid'

export const fetchData = async () =>
{
    await initAWS();

    const params = {
        TableName: "Recepies",
    }

    try {
        const data = await dynamodb.scan(params).promise();
        return { success: true, data: data.Items };
    } catch(error)
    {
        return {success: false, message: error.message};
    }
}
export const fetchDataByTag = async (tag) =>
{
    await initAWS();

    const params = {
        TableName: "Recepies",
        FilterExpression: 'contains (#tags, :tag)',
        ExpressionAttributeNames: {
        '#tags': 'tags',
        },
        ExpressionAttributeValues: {
        ':tag': tag,
        },
    }

    try {
        const data = await dynamodb.scan(params).promise();
        return { success: true, data: data.Items };
    } catch(error)
    {
        return {success: false, message: error.message};
    }
}


export const uploadData = async (data) => {
  await initAWS();

  data.id = uuidv4();
  data.CreationDate = new Date().toISOString();
  data.CreationDatePK = "dish";

  const params = {
    TableName: 'Recepies',
    Item: data,
  };

  try {
    await dynamodb.put(params).promise();
    console.log('Recepie uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading dish:', data);
    throw error;
  }
};

export const fetchLastXData = async (count) =>
{
    await initAWS();

    const params = {
        TableName: 'Recepies',
        IndexName: 'CreationDatePKIndex',
        KeyConditionExpression: 'CreationDatePK = :type',
        ExpressionAttributeValues: {
            ':type': 'dish',
        },
        ScanIndexForward: false,
        Limit: count,
    };

    try {
        const result = await dynamodb.query(params).promise();
        return { success: true, data: result.Items};
    } catch(error)
    {
        return {success: false, message: error.message};
    }
}

export const fetchDataById = async (id) =>
{
    await initAWS();
    
    const params = {
        TableName: "Recepies",
        Key: {
            id: id, // Assuming 'id' is your partition key
        },
    }

    try {
        const data = await dynamodb.get(params).promise();
        return { success: true, data: data.Item };
    } catch(error)
    {
        return {success: false, message: error.message};
    }
}