import { createClient } from "contentful"
import { useEffect, useState } from "react"
import RecipeCard from "../components/RecipeCard"

export async function getRecipes() {
  const client  = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY
    // space: process.env.CONTENTFUL_SPACE_ID,
    // accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  if (client) {
    console.log('success')
  }

  const res = await client.getEntries({ content_type: 'recipe', include: 2})
  console.log(res.items)

  return res.items 
}   

export default function Recipes() { 
    
  const [theRecipes, setTheRecipes] = useState([])

  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await getRecipes()
      setTheRecipes(recipes)
      console.log(recipes)
    }

    fetchRecipes()
    
  }, [])
   

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-15">
      {
        theRecipes.map(recipe => (  
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))
      }
    </div>
  )
}

