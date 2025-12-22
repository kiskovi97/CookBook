export async function uploadImageToServer(file: File) {
  const fileData = await fileToBase64(file)

  const res = await fetch('https://recipe-images.kiskovi97.workers.dev/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      fileData: fileData.split(',')[1], // remove "data:*/*;base64,"
    }),
  })

  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`)

  const data = await res.json()

  return data.imageUrl as string
}

export async function copyImageToServer(url: string) {
  const res = await fetch('https://recipe-images.kiskovi97.workers.dev/copy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl: url }),
  })
  const { imageUrl } = await res.json()

  return imageUrl
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
