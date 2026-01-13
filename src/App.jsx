import { useState, useEffect } from 'react'
import './App.css'
import MyRecipesComponent from './MyRecipesComponent';

// https://api.edamam.com/api/recipes/v2?type=public&q=lemon&app_id=...&app_key=...

function App() { 

  const MY_ID = "f162d636";
  const MY_KEY = "a4f2cc57a841ecd25cb95b20765cf3d4";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=lemon&app_id=${MY_ID}&app_key=${MY_KEY}`;
      const response = await fetch(url, {
          headers: {
              "Edamam-Account-User": "Lilia", // любой ваш userId
          },
      });
      const data = await response.json();
      console.log(data.hits);
      setMyRecipes(data.hits)
    }
    getRecipe()
  }, []);
  
  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div className='App'>

      <div className='container'>
        <h1>Find a Recipe</h1>
      </div>

      <form>
        <input type="text" placeholder='Type the ingredients separated by spaces' value={mySearch} onChange={myRecipeSearch} />
      </form>

      <div className='recipes-container'>
        {myRecipes.map((element, index) => (
          <MyRecipesComponent key={index} recipeTitle={element.recipe.label} calories={element.recipe.calories} ingredients={element.recipe.ingredientLines} image={element.recipe.image} recipeURL={element.recipe.url} />
        )) }
      </div>


      
    </div>
  )
}

export default App
