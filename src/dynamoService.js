import { dynamodb, initAWS } from "./aws-config.js";
import { v4 as uuidv4 } from 'uuid'

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

export const uploadData = async (data) => {
  await initAWS();

  data.dishId = uuidv4();

  const params = {
    TableName: 'Dishes',
    Item: data,
  };

  try {
    await dynamodb.put(params).promise();
    console.log('Dish uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading dish:', data);
    throw error;
  }
};

export const fetchDataNyId = async (dishId) =>
{
    await initAWS();
    
    const params = {
        TableName: "Dishes",
        Key: {
            dishId: dishId, // Assuming 'id' is your partition key
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