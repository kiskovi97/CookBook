
// Define your item type (adjust fields as needed for your schema)
export interface Recipe {
  id: string,
  CreationDate?: string,
  CreationDatePK?: string,
  title?: string,
  tags?: string[],
  ingredients?: IngredientGroup[],
  instructions?: string[],
  details?: string,
  image?: string,
}

export interface IngredientGroup {
  title?: string,
  list?: string[],
}