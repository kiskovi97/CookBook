import type { Recipe } from '../types/recipe'

export interface ReturnError {
  type: 'serverError' | 'known_issue' | 'failed_to_parse'
  message: unknown
}

export type Result<T> =
  | {
      type: 'error'
      data: ReturnError
    }
  | {
      type: 'data'
      data: T
    }

export async function extractRecipe(url: string): Promise<Result<Recipe>> {
  try {
    const response = await fetch('https://cookbookparser.onrender.com/parse_recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      if (response.status === 500) {
        return { type: 'error', data: { type: 'serverError', message: response.statusText } }
      }
      return { type: 'error', data: { type: 'known_issue', message: response.statusText } }
    }

    const data = await response.json()
    console.log('Fetched recipe data:', data)

    const returnData = {
      id: data.id || '',
      CreationDate: data.CreationDate || new Date().toISOString(),
      CreationDatePK: data.CreationDatePK || '',
      title: data.title || 'No title',
      ingredients: [{ title: 'Ingredients', list: data.ingredients || [] }],
      instructions: data.instructions || [],
      image: data.image || '',
      tags: data.tags,
      details: data.desc || '',
      sources: [
        {
          name: 'Link',
          link: url,
        },
      ],
    }

    return { type: 'data', data: returnData }
  } catch (error) {
    console.error('Failed to fetch recipe:', error)
    return { type: 'error', data: { type: 'failed_to_parse', message: error } }
  }
}

export async function extractRecipeFromText(text: string): Promise<Result<Recipe>> {
  try {
    const response = await fetch('https://cookbookparser.onrender.com/parse_recipe_text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      if (response.status === 500) {
        return { type: 'error', data: { type: 'serverError', message: response.statusText } }
      }
      return { type: 'error', data: { type: 'known_issue', message: response.statusText } }
    }

    const data = await response.json()
    console.log('Fetched recipe data:', data)

    const returnData = {
      id: data.id || '',
      CreationDate: data.CreationDate || new Date().toISOString(),
      CreationDatePK: data.CreationDatePK || '',
      title: data.title || 'No title',
      ingredients: [{ title: 'Ingredients', list: data.ingredients || [] }],
      instructions: data.instructions || [],
      image: data.image || '',
      tags: data.tags,
      details: data.desc || '',
      sources: [],
    }

    return { type: 'data', data: returnData }
  } catch (error) {
    console.error('Failed to fetch recipe:', error)
    return { type: 'error', data: { type: 'failed_to_parse', message: error } }
  }
}

export async function extractImage(url: string): Promise<string | null> {
  const response = await fetch('https://cookbookparser.onrender.com/parse_image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data.image || null
}
