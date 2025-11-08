import { Recipe } from '@/types/recipe';
import styles from "./Input.module.css"

const AddRecipeButton = ({ onClickedAndChanged }: { onClickedAndChanged: (recipe: Recipe) => void }) => {

  const handleClick = async () => {
      onClickedAndChanged({
            id: "",
            CreationDate: new Date().toISOString(),
            CreationDatePK: "dish",
            title: "New Recipe",
            ingredients: [{ title: "Ingredients", list: [] }],
            instructions: [],
            image: "",
            tags: [],
            details: "",
            sources: []
        });
  };

  return (
    <div className={styles.section}>
      <button onClick={handleClick} className={styles.button}>
        Add new Recipe
      </button>
    </div>
  );
};

export default AddRecipeButton;
