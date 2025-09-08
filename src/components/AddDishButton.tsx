import { useState } from 'react';
import fetchRecipe from "@/lib/fetchRecipe"; // Make sure this is correctly implemented
import { Recipe } from '@/types/recipe';

const AddDishButton = ({ onClickedAndChanged }: { onClickedAndChanged: (recipe: Recipe) => void }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExtractAndUpload = async () => {
    setLoading(true);
    try {
      console.log('Extracting recipe from URL:', url);
      const recipe = await fetchRecipe(url);

      if (!recipe) {
        alert('No recipe found or recipe is invalid.');
        setLoading(false);
        return;
      }

      onClickedAndChanged(recipe);
      alert('Dish processed!');
      setUrl('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to extract or upload the dish.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Paste recipe URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: '0.5rem', width: '60%' }}
      />
      <button onClick={handleExtractAndUpload} disabled={loading || !url.trim()} style={{ marginLeft: '0.5rem' }}>
        {loading ? 'Uploading...' : 'Upload Recipe'}
      </button>
    </div>
    </div>
  );
};

export default AddDishButton;
