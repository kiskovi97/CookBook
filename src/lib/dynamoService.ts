// src/lib/dynamoService.ts
import { dynamodb } from './aws-config'
import { v4 as uuidv4 } from 'uuid'
import type {
  GetCommandInput,
  PutCommandInput,
  QueryCommandInput,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb'
import type { Recipe, Wine } from '../types/recipe'

// Generic service response type
export interface ServiceResponse<T> {
  success: boolean
  data?: T
  message?: string
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
export const fetchRecepieData = async (): Promise<ServiceResponse<Recipe[]>> => {
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

// ------------------ FETCH BY TAG ------------------
export const fetchRecepieDataByTag = async (tag?: string): Promise<ServiceResponse<Recipe[]>> => {
  if (!tag) return await fetchRecepieData()

  const params: ScanCommandInput = {
    TableName: 'Recepies',
    FilterExpression: 'contains (#tags, :tag)',
    ExpressionAttributeNames: {
      '#tags': 'tags',
    },
    ExpressionAttributeValues: {
      ':tag': tag,
    },
  }

  try {
    const data = await dynamodb.scan(params)
    return { success: true, data: (data.Items as Recipe[]) || [] }
  } catch (error: unknown) {
    return { success: false, message: (error as Error).message }
  }
}
// ------------------ UPLOAD ------------------
export const uploadWineData = async (data: Partial<Wine>): Promise<void> => {
  const item: Wine = {
    id: data.id || uuidv4(),
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
export const uploadRecepieData = async (data: Partial<Recipe>): Promise<void> => {
  const item: Recipe = {
    id: data.id || uuidv4(),
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

export const deleteRecepieDataById = async (id: string): Promise<void> => {
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
  data.id = uuidv4()
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
export const uploadNewRecepieData = async (data: Recipe) => {
  data.id = uuidv4()
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

// ------------------ FETCH LAST X ------------------
export const fetchLastXRecepieData = async (count: number): Promise<ServiceResponse<Recipe[]>> => {
  const params: QueryCommandInput = {
    TableName: 'Recepies',
    IndexName: 'CreationDatePKIndex',
    KeyConditionExpression: 'CreationDatePK = :type',
    ExpressionAttributeValues: {
      ':type': 'dish',
    },
    ScanIndexForward: false,
    Limit: count,
  }

  try {
    const result = await dynamodb.query(params)
    return { success: true, data: (result.Items as Recipe[]) || [] }
  } catch (error: unknown) {
    return { success: false, message: (error as Error).message }
  }
}

// ------------------ FETCH BY ID ------------------
export const fetchWineDataById = async (id: string): Promise<ServiceResponse<Wine>> => {
  const params: GetCommandInput = {
    TableName: 'Wines',
    Key: { id },
  }

  try {
    const data = await dynamodb.get(params)
    return { success: true, data: data.Item as Wine }
  } catch (error: unknown) {
    return { success: false, message: (error as Error).message }
  }
}

// ------------------ FETCH BY ID ------------------
export const fetchRecepieDataById = async (id: string): Promise<ServiceResponse<Recipe>> => {
  const params: GetCommandInput = {
    TableName: 'Recepies',
    Key: { id },
  }

  try {
    const data = await dynamodb.get(params)
    return { success: true, data: data.Item as Recipe }
  } catch (error: unknown) {
    return { success: false, message: (error as Error).message }
  }
}
