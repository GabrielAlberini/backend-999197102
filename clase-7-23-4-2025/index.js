import { recipes } from "./recipes.js"

const ingredient = process.argv[2]

console.log(ingredient, "<- nombre de la receta")

const foundRecipes = recipes.filter(recipe => recipe.ingredients?.includes(ingredient))

console.log(foundRecipes)