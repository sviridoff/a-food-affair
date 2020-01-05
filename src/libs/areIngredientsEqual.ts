export default function areIngredientsEqual(
  ingrediensIds0: string[],
  ingredientsIds1: string[],
) {
  if (ingrediensIds0.length !== ingredientsIds1.length) {
    return false;
  }

  const orederdIngredienstIds0 = ingrediensIds0.sort();
  const orederdIngredienstIds1 = ingredientsIds1.sort();

  return orederdIngredienstIds0
    .every((IngredientId, index) =>
      IngredientId === orederdIngredienstIds1[index]);
}
