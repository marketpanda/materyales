import { createClient } from "contentful"
import Image from "next/image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
 
const client  = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY
})


export const getStaticPaths = async() => {
  const res = await client.getEntries({
    content_type: 'recipe',
  })

  const paths = res.items.map(item => {
    return {
      params: {
        slug: item.fields.slug
      }
    }
  })

  return {
    paths,
    fallback: false

  }
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug
  })
  return {
    props: { recipe: items[0]}
  }
}

export default function RecipeDetails({ recipe }) {   
  const { featureImage, title, cookingTime, ingredients, method } = recipe.fields
  console.log(recipe)
  return (
    <div className="banner">
      <Image
        src={'https:' + featureImage.fields.file.url}
        width={featureImage.fields.file.details.image.width}
        height={featureImage.fields.file.details.image.height}
      />
      <h2>{ title }</h2>
      <div className="info">
        <p>Takes about { cookingTime }</p>
        <h3>Ingredients:</h3>
        {
          ingredients.map(ingredient => (
            <span key={ingredient}>{ingredient + ' ,'}</span>
          ))
        }
      </div>
      <div className="method">
        <h3>Method: </h3>
        <div>
          {documentToReactComponents(method)}
        </div>

      </div>
    </div>
  )
}