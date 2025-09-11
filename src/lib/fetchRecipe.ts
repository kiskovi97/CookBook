import { Recipe } from '../types/recipe';

export async function extractRecipe(url: string) : Promise<Recipe | null> {
    try {
        const response = await fetch('https://cookbookparser.onrender.com/parse_recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched recipe data:', data);

        const returnData =  {
            id: data.id || "",
            CreationDate: data.CreationDate || new Date().toISOString(),
            CreationDatePK: data.CreationDatePK || "",
            title: data.title || "No title",
            ingredients: [{ title: "Ingredients", list: data.ingredients || [] }],
            instructions: data.instructions || [],
            image: data.image || "",
            tags: data.tags,
            details: data.desc,
            sources: [
                {
                    name: "Link",
                    link: url
                }
            ]
        };

        return returnData;
    } catch (error) {
        console.error('Failed to fetch recipe:', error);
        return null;
    }
}

export async function extractImage(url: string) : Promise<string | null> {
    const response = await fetch('https://cookbookparser.onrender.com/parse_image', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.image || null;
}