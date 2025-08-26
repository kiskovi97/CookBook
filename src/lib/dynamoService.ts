// src/lib/dynamoService.ts
import { dynamodb, initAWS } from "./aws-config";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import { Recipe } from "../types/recipe";

// Generic service response type
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// ------------------ FETCH ALL ------------------
export const fetchData = async (): Promise<ServiceResponse<Recipe[]>> => {
  await initAWS();

  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: "Recepies",
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return { success: true, data: (data.Items as Recipe[]) || [] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ------------------ FETCH BY TAG ------------------
export const fetchDataByTag = async (
  tag?: string
): Promise<ServiceResponse<Recipe[]>> => {
  if (!tag) return await fetchData();

  await initAWS();

  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: "Recepies",
    FilterExpression: "contains (#tags, :tag)",
    ExpressionAttributeNames: {
      "#tags": "tags",
    },
    ExpressionAttributeValues: {
      ":tag": tag,
    },
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return { success: true, data: (data.Items as Recipe[]) || [] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ------------------ UPLOAD ------------------
export const uploadData = async (data: Partial<Recipe>): Promise<void> => {
  await initAWS();

  const item: Recipe = {
    id: uuidv4(),
    CreationDate: new Date().toISOString(),
    CreationDatePK: "dish",
    ...data,
  };

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: "Recepies",
    Item: item,
  };

  try {
    await dynamodb.put(params).promise();
    console.log("Recipe uploaded successfully:", item);
  } catch (error) {
    console.error("Error uploading dish:", item);
    throw error;
  }
};

// ------------------ FETCH LAST X ------------------
export const fetchLastXData = async (
  count: number
): Promise<ServiceResponse<Recipe[]>> => {
  await initAWS();

  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: "Recepies",
    IndexName: "CreationDatePKIndex",
    KeyConditionExpression: "CreationDatePK = :type",
    ExpressionAttributeValues: {
      ":type": "dish",
    },
    ScanIndexForward: false,
    Limit: count,
  };

  try {
    const result = await dynamodb.query(params).promise();
    return { success: true, data: (result.Items as Recipe[]) || [] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ------------------ FETCH BY ID ------------------
export const fetchDataById = async (
  id: string
): Promise<ServiceResponse<Recipe>> => {
  await initAWS();

  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: "Recepies",
    Key: { id },
  };

  try {
    const data = await dynamodb.get(params).promise();
    return { success: true, data: data.Item as Recipe };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
