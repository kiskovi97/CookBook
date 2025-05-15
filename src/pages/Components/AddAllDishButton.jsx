import { useState } from 'react';
import { uploadData } from '../../dynamoService.js';
import fetchRecipe from './fetchRecipe.js'; // Make sure this is correctly implemented
import dishes from "../dishes.js";

const AddAllDishButton = ({ onClickedAndChanged }) => {
  const [loading, setLoading] = useState(false);

  const handleExtractAndUpload = async () => {
    setLoading(true);
    try {
        for(let data of dishes)
        {
            if (data.link)
            {
                const recipe = await fetchRecipe(data.link);

                if (!recipe) {
                    alert('No recipe found or recipe is invalid.');
                    setLoading(false);
                    continue;
                }

                if (!recipe.tags)
                  recipe.tags = [];

                if (data.main)
                {
                  recipe.tags.push("main");
                }
                recipe.main = undefined;

                if (data.dessert)
                {
                  recipe.tags.push("dessert");
                }
                recipe.dessert = undefined;

                if (data.chicken)
                {
                  recipe.tags.push("chicken");
                }
                recipe.chicken = undefined;

                if (data.pasta)
                {
                  recipe.tags.push("pasta");
                }
                recipe.pasta = undefined;

                await uploadData(recipe);
            } else {
                let recipe = data;
                if (!recipe.tags)
                  recipe.tags = [];

                if (recipe.main)
                {
                  recipe.tags.push("main");
                }
                recipe.main = undefined;

                if (recipe.dessert)
                {
                  recipe.tags.push("dessert");
                }
                recipe.dessert = undefined;

                if (recipe.chicken)
                {
                  recipe.tags.push("chicken");
                }
                recipe.chicken = undefined;

                if (recipe.pasta)
                {
                  recipe.tags.push("pasta");
                }
                recipe.pasta = undefined;

                await uploadData(data);
            }
        }
        onClickedAndChanged();
        alert('Dish uploaded successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to extract or upload the dish.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={handleExtractAndUpload} disabled={loading} style={{ marginLeft: '0.5rem' }}>
        {loading ? 'Uploading...' : 'Upload Recipe'}
      </button>
    </div>
  );
};

export default AddAllDishButton;
