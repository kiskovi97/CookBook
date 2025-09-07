// src/lib/dynamoService.ts
import { dynamodb } from "./aws-config";
import { v4 as uuidv4 } from "uuid";
import { GetCommandInput, PutCommandInput, QueryCommandInput, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { Recipe } from "../types/recipe";

// Generic service response type
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// ------------------ FETCH ALL ------------------
export const fetchData = async (): Promise<ServiceResponse<Recipe[]>> => {
  
  const params: ScanCommandInput = {
    TableName: "Recepies",
  };

  try {
    const data = await dynamodb.scan(params);
    console.log(data);
    return { success: true, data: (data.Items as Recipe[]) || [] };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

// ------------------ FETCH BY TAG ------------------
export const fetchDataByTag = async (
  tag?: string
): Promise<ServiceResponse<Recipe[]>> => {
  if (!tag) return await fetchData();
  
  const params: ScanCommandInput = {
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
    const data = await dynamodb.scan(params);
    return { success: true, data: (data.Items as Recipe[]) || [] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ------------------ UPLOAD ------------------
export const uploadData = async (data: Partial<Recipe>): Promise<void> => {
  const item: Recipe = {
    id: uuidv4(),
    CreationDate: new Date().toISOString(),
    CreationDatePK: "dish",
    title: data.title ?? "",
    ...data,
  };

  const params: PutCommandInput = {
    TableName: "Recepies",
    Item: item,
  };

  try {
    await dynamodb.put(params);
    console.log("Recipe uploaded successfully:", item);
  } catch (error) {
    console.error("Error uploading dish:", item);
    throw error;
  }
};

// ------------------ UPLOAD NEW ------------------
export const uploadNewData = async (data : Recipe) => {
  data.id = uuidv4();
  data.CreationDate = new Date().toISOString();
  data.CreationDatePK = "dish";

  const params = {
    TableName: 'Recepies',
    Item: data,
  };

  try {
    await dynamodb.put(params);
    console.log('Recepie uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading dish:', data);
    throw error;
  }
};

// ------------------ FETCH LAST X ------------------
export const fetchLastXData = async (
  count: number
): Promise<ServiceResponse<Recipe[]>> => {
  const params: QueryCommandInput = {
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
    const result = await dynamodb.query(params);
    return { success: true, data: (result.Items as Recipe[]) || [] };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ------------------ FETCH BY ID ------------------
export const fetchDataById = async (
  id: string
): Promise<ServiceResponse<Recipe>> => {
  const params: GetCommandInput = {
    TableName: "Recepies",
    Key: { id },
  };

  try {
    const data = await dynamodb.get(params);
    return { success: true, data: data.Item as Recipe };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
