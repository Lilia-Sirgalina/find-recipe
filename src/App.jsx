import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import './App.css'
import MyRecipesComponent from './MyRecipesComponent'
import searchIcon from './icons8-search-120.png'

// https://api.edamam.com/api/recipes/v2?type=public&q=lemon&app_id=...&app_key=...

function App() { 

  const MY_ID = "f162d636";
  const MY_KEY = "a4f2cc57a841ecd25cb95b20765cf3d4";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("avocado");  

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`;
      const response = await fetch(url, {
          headers: {
              "Edamam-Account-User": "Lilia", // любой ваш userId
          },
      });
      const data = await response.json();  

      if (data.hits.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter correct data",            
          });
      return;      
      } 

      setMyRecipes(data.hits);           
    }    
    getRecipe();    
  }, [wordSubmitted]);
  
  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)    
  }

  const finalSearch = (e) => {
    e.preventDefault();
    
    if (mySearch === "" || !isNaN(Number(mySearch))) {
        setWordSubmitted("avocado");
    }    
    else setWordSubmitted(mySearch);
  }

  return (
    <div className='App'>

      <div className='header'>
        <h1>Find a Recipe</h1>
      </div>

      <form onSubmit={finalSearch}>
        <input className='search' type="text" placeholder='Type the ingredients separated by spaces...' value={mySearch} onChange={myRecipeSearch} />
        <button onClick={finalSearch}><img src={searchIcon} alt="icon" width="25px" /></button>
      </form>      

      <div className='recipes-container'>
        {myRecipes.map((element, index) => (
          <MyRecipesComponent 
          key={index} 
          recipeTitle={element.recipe.label} 
          calories={element.recipe.calories} 
          ingredients={element.recipe.ingredientLines} 
          image={element.recipe.image} 
          recipeURL={element.recipe.url} />
        )) }
      </div>
      
    </div>
  )
}

export default App
