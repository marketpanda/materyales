import React from 'react'
import { createClient } from 'contentful' 

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
})

export const generateStaticParams = async() => {
  const res = await client.getEntries({ content_type: 'recipe'})

  return res.items.map((item) => ({
    slug: item.fields.slug
  }))
}

 

export const getBuildingLaw = async(theSlug: string) => {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': theSlug
  })

  return  items[0] 
}

const page = ({ params }: { params: { slug: string }}) => { 
  const buildingLaw = getBuildingLaw(params.slug)
  console.log(buildingLaw)
  return (
    <div>a</div> 
  )
}

export default page