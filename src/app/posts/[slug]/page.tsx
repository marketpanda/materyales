import { createClient } from 'contentful'
import React from 'react'

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
})

export async function getStaticPaths() {
    const response = await client.getEntries({
        content_type: 'recipe'
    })

    const paths = response.items.map((item) => {
        return {
            params: { slug: item.fields.slug } 
        }
    })
    return {
        paths: paths,
        fallback: false
    }
}
  
// https://github.com/vercel/next.js/issues/51860
export async function getBuildingLaw({ params }: { params: { slug: string } }) {
    const { items } = await client.getEntries({
        content_type: 'recipe',
        'fields.slug': params.slug
    })

    return  items[0]
}

export async function generateStaticParams() {
    const posts = ['post-one', 'post-two']
    return posts.map((post) => {
        return {
            slug: post
        }
    })
}

const page = async(props:any) => { 
    console.log(props)

    const articleBuildingLaw = await getBuildingLaw(props.params.slug)

    return (
        <div>hello</div>
    )
}

export default page