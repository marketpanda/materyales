import React from 'react'
import { createClient } from 'contentful'
import Link from 'next/link'

interface BuildingLaw {
    sys: {
        id: string
    }
    fields: {
        title: string
        slug?: string
        thumbnail?: {
            fields?: {
                file?: {
                    url?:string | undefined
                }
            }
        } 
    }
} 

const getData = async() => {
    const client = createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY as string,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
    })

    const response = await client.getEntries({ content_type: 'recipe'})
    return response.items 
}

const page = async(props:any) => {

    console.log("props")
    console.log(props)
    const buildingLaws:BuildingLaw[] = await getData() 
    return (
        <div>
            {
                buildingLaws.map((buildingLaw:BuildingLaw) => (
                    <div key={buildingLaw.sys.id}>
                        <div>{buildingLaw.fields.title}</div>
                        <div>{buildingLaw.fields?.thumbnail?.fields?.file?.url}</div>
                        <Link href={`building-laws/${buildingLaw.fields.slug}`} >link</Link>
                    </div>
                ))
            }

            <pre>
                {
                    JSON.stringify(buildingLaws, null, 2)
                }
            </pre> 
        </div>
    )
}

export default page