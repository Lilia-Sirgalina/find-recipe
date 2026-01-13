function MyRecipesComponent ({recipeTitle, calories, ingredients, image, recipeURL}) {
    return(
        <div className="recipe-card">
            <h2>{recipeTitle}</h2>

            <p>{calories.toFixed()} calories</p>

            <ul>
                {ingredients.map((item, index) => {
                    return(<li key={index}>{item}</li>)
                })}
            </ul>

            <img src={image} alt="dish" />

            <button><a href={recipeURL} target="_blank">View recipe</a></button>
        </div>
    )
}

export default MyRecipesComponent;