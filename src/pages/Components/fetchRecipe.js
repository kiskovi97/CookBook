async function extractRecipe(url) {
    try {
        console.log(url);
        if (url.includes("streetkitchen"))
            return await extractRecipeStreetKitchen(url);
    } catch {

    }
}
async function extractRecipeStreetKitchen(url) {
    try {
        console.log(url);
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extracting recipe title, ingredients, and instructions using class names
        const title = doc.querySelector('.main .entry-title').textContent.trim();
        const details = doc.querySelector('.entry-content .entry-lead').textContent.trim();
        const ingredients = Array.from(doc.querySelectorAll('.ingredients-main .ingredients-content dd'))
            .map(ing => ing.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
        const instructions = Array.from(doc.querySelectorAll('.the-content-div p'))
            .map(step => step.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
        const tags = Array.from(doc.querySelectorAll('.tags-list a'))
                .map(step => step.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
        const imageMeta = doc.querySelector('meta[property="og:image"]');
        const image = imageMeta ? imageMeta.getAttribute('content') : null;

        // Creating JSON formatted recipe
        const data = {
            title,
            ingredients: [{
                title: "Ingredients",
                list: ingredients
            }],
            instructions,
            image,
            details,
            tags
        };

        console.log(JSON.stringify(data, null, 2));
        return data;
    } catch {

    }
}
export default extractRecipe;