import { useState } from 'react';
import styles from "./Input.module.css"
import { extractImage } from "@/lib/fetchRecipe"; // Make sure this is correctly implemented

const UpdateImageButton = ({ onClickedAndChanged }: { onClickedAndChanged: (image: string) => void }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExtractAndUpload = async () => {
    setLoading(true);
    try {
      console.log('Extracting recipe from URL:', url);
      const image = await extractImage(url);

      if (!image) {
        alert('No image found or image is invalid.');
        setLoading(false);
        return;
      }

      onClickedAndChanged(image);
      alert('Image processed!');
      setUrl('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to extract recipe.');
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
        {loading ? 'Extracting...' : 'Extract Image'}
      </button>
    </div>
  );
};

export default UpdateImageButton;
