// src/lib/dynamoService.ts
import { dynamodb } from './aws-config'
import { v4 as uuid } from 'uuid'
import type { PutCommandInput, ScanCommandInput } from '@aws-sdk/lib-dynamodb'
import type { Recipe, Wine } from '../types/recipe'
import type { AttributeValue } from '@aws-sdk/client-dynamodb'

// Generic service response type
export interface ServiceResponse<T> {
  success: boolean
  data?: T
  message?: string
  nextKey?: Record<string, AttributeValue>
}

// ------------------ FETCH ALL ------------------
export const fetchWineData = async (): Promise<ServiceResponse<Wine[]>> => {
  const params: ScanCommandInput = {
    TableName: 'Wines',
  }

  try {
    const data = await dynamodb.scan(params)
    console.log(data)
    return { success: true, data: (data.Items as Wine[]) || [] }
  } catch (error: unknown) {
    console.log(error)
    return { success: false, message: (error as Error).message }
  }
}
// ------------------ FETCH ALL ------------------
export const fetchRecipeData = async (): Promise<ServiceResponse<Recipe[]>> => {
  const params: ScanCommandInput = {
    TableName: 'Recepies',
  }

  try {
    const data = await dynamodb.scan(params)
    console.log(data)
    return { success: true, data: (data.Items as Recipe[]) || [] }
  } catch (error: unknown) {
    console.log(error)
    return { success: false, message: (error as Error).message }
  }
}

export const fetchRecipePage = async (
  limit = 25,
  nextKey?: Record<string, AttributeValue>,
): Promise<ServiceResponse<Recipe[]>> => {
  const params: ScanCommandInput = {
    TableName: 'Recepies',
    Limit: limit,
    ExclusiveStartKey: nextKey,
  }

  return dynamodb
    .scan(params)
    .then((data) => ({
      success: true,
      data: (data.Items as Recipe[]) || [],
      nextKey: data.LastEvaluatedKey,
    }))
    .catch((error: unknown) => ({ success: false, message: (error as Error).message }))
}

// ------------------ UPLOAD ------------------
export const uploadWineData = async (data: Partial<Wine>): Promise<void> => {
  const item: Wine = {
    id: data.id || uuid(),
    CreationDate: data.CreationDate || new Date().toISOString(),
    title: data.title ?? '',
    ...data,
  }

  const params: PutCommandInput = {
    TableName: 'Wines',
    Item: item,
  }

  try {
    await dynamodb.put(params)
    console.log('Wine uploaded successfully:', item)
  } catch (error) {
    console.error('Error uploading dish:', item)
    throw error
  }
}

// ------------------ UPLOAD ------------------
export const uploadRecipeData = async (data: Partial<Recipe>): Promise<void> => {
  const item: Recipe = {
    id: data.id || uuid(),
    CreationDate: data.CreationDate || new Date().toISOString(),
    CreationDatePK: 'dish',
    title: data.title ?? '',
    ...data,
  }

  const params: PutCommandInput = {
    TableName: 'Recepies',
    Item: item,
  }

  try {
    await dynamodb.put(params)
    console.log('Recipe uploaded successfully:', item)
  } catch (error) {
    console.error('Error uploading dish:', item)
    throw error
  }
}

export const deleteWineDataById = async (id: string): Promise<void> => {
  const params = {
    TableName: 'Wines',
    Key: { id },
  }

  try {
    await dynamodb.delete(params)
    console.log('Wine deleted successfully:', id)
  } catch (error) {
    console.error('Error deleting dish:', id)
    throw error
  }
}

export const deleteRecipeDataById = async (id: string): Promise<void> => {
  const params = {
    TableName: 'Recepies',
    Key: { id },
  }

  try {
    await dynamodb.delete(params)
    console.log('Recipe deleted successfully:', id)
  } catch (error) {
    console.error('Error deleting dish:', id)
    throw error
  }
}

// ------------------ UPLOAD NEW ------------------
export const uploadNewWineData = async (data: Wine) => {
  data.id = uuid()
  data.CreationDate = new Date().toISOString()

  const params = {
    TableName: 'Wines',
    Item: data,
  }

  try {
    await dynamodb.put(params)
    console.log('Recepie uploaded successfully:', data)
  } catch (error) {
    console.error('Error uploading dish:', data)
    throw error
  }
}

// ------------------ UPLOAD NEW ------------------
export const uploadNewRecipeData = async (data: Recipe) => {
  data.id = uuid()
  data.CreationDate = new Date().toISOString()
  data.CreationDatePK = 'dish'

  const params = {
    TableName: 'Recepies',
    Item: data,
  }

  try {
    await dynamodb.put(params)
    console.log('Recepie uploaded successfully:', data)
  } catch (error) {
    console.error('Error uploading dish:', data)
    throw error
  }
}
