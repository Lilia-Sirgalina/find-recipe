import icon from './icons8-tick-48.png'

function MyRecipesComponent ({recipeTitle, calories, ingredients, image, recipeURL}) {
    return(
        <div className="recipe-card">
            <h2>{recipeTitle}</h2>

            <p>{calories.toFixed()} calories</p>

            <ul>
                {ingredients.map((item, index) => {                    
                    return(
                        <li key={index}> 
                            <img src={icon} alt="icon" width="20px" />  
                            {item}
                        </li>)
                })}
            </ul>

            <img className='recipe-image' src={image} alt="dish" />

            <br />

            <button className='recipe-button'><a href={recipeURL} target="_blank">View recipe</a></button>
        </div>
    )
}

export default MyRecipesComponent;