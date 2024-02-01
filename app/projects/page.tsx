 
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import Image from 'next/image'

import { createClient } from 'contentful'


export const metadata = genPageMetadata({ title: 'Projects' })


async function getData() {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY as string
  })

  const res = await client.getEntries({ content_type: 'recipe', include: 2 })

  return res.items

}


export default async function Projects({ contents }) {
  const data = await getData()
 
   
 
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <div className='flex flex-col gap-2'>
            {
              data.map((g:any) => (
                <div>
                  <div>{g.fields.title}</div>
                  <div><pre>{JSON.stringify(g.fields.thumbnail.fields.file.url, null, "\t")}</pre></div>
                  <Image src={`https://${g.fields.thumbnail.fields.file.url}`} width="100" height="100" alt="image" /> 
                  <div><pre>{JSON.stringify(g.fields, null, "\t")}</pre></div>
                </div>
              ))
            }
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}
