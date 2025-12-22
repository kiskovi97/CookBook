import type { Recipe } from '@/types/recipe'

export enum ProblemType {
  Image,
  ImageUpload,
  Tag,
  Details,
  Link,
}

export interface RecipeRef {
  id: string
  problem: ProblemType
  value: string
}

export async function checkImage(url: string, timeoutMs = 5000): Promise<boolean> {
  if (!url) return false
  // Try HEAD request first
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal })
    clearTimeout(timeout)
    const contentType = res.headers.get('content-type')
    // If HEAD fails or is not allowed, try GET request for images
    if (res.ok && contentType?.startsWith('image/')) {
      return true
    }
    // Some servers don't support HEAD, fallback to GET
    const getRes = await fetch(url, { method: 'GET', signal: controller.signal })
    const getType = getRes.headers.get('content-type')
    return (getRes.ok && getType?.startsWith('image/')) || false
  } catch {
    clearTimeout(timeout)
    return false
  }
}

export function IsImageOnServer(url: string) {
  return url.includes('recipe-images.kiskovi97.workers.dev')
}

export function checkImageClient(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = `${url}?_=${Date.now()}` // 👈 cache buster
  })
}

export async function fetchInspectionData(dataItem: Recipe): Promise<RecipeRef[]> {
  const problems: RecipeRef[] = []
  const imageLink = dataItem?.image?.replace(
    '/CookBook/static/media',
    'https://kiskovi97.github.io/CookBook/images',
  )

  if (!imageLink) {
    problems.push({
      id: dataItem.id,
      problem: ProblemType.Image,
      value: dataItem.title,
    })
  } else if (!(await checkImageClient(imageLink))) {
    problems.push({
      id: dataItem.id,
      problem: ProblemType.Image,
      value: imageLink || `No Image for: ${dataItem.title}`,
    })
  } else if (!IsImageOnServer(imageLink)) {
    problems.push({
      id: dataItem.id,
      problem: ProblemType.ImageUpload,
      value: imageLink || `No Image for: ${dataItem.title}`,
    })
  }
  if (!dataItem.details) {
    problems.push({
      id: dataItem.id,
      problem: ProblemType.Details,
      value: dataItem.details || `No Details for: ${dataItem.title}`,
    })
  }
  if (!dataItem.tags || dataItem.tags.length === 0) {
    problems.push({
      id: dataItem.id,
      problem: ProblemType.Tag,
      value: `No Tags for: ${dataItem.title}`,
    })
  } else if (!dataItem.tags.includes('main') && !dataItem.tags.includes('dessert')) {
    problems.push({
      id: dataItem.id,
      problem: ProblemType.Tag,
      value: `${dataItem.title}: ` + dataItem.tags.join(', '),
    })
  }

  if (!dataItem.sources || dataItem.sources.length == 0)
    problems.push({
      id: dataItem.id,
      problem: ProblemType.Link,
      value: `Missing Links`,
    })
  return problems
}
