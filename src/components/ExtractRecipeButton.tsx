import { useState } from 'react';
import { extractRecipe } from "@/lib/fetchRecipe"; // Make sure this is correctly implemented
import { Recipe } from '@/types/recipe';
import styles from "./Input.module.css"

const AddDishButton = ({ onClickedAndChanged }: { onClickedAndChanged: (recipe: Recipe) => void }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExtractAndUpload = async () => {
    setLoading(true);
    try {
      console.log('Extracting recipe from URL:', url);
      const recipe = await extractRecipe(url);

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
      alert('Failed to extract the dish.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.section}>
      <textarea
        placeholder="Paste recipe URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className={styles.textarea}
      />
      <button onClick={handleExtractAndUpload} disabled={loading || !url.trim()} className={styles.button}>
        {loading ? 'Extracting...' : 'Extract Recipe'}
      </button>
    </div>
  );
};

export default AddDishButton;
