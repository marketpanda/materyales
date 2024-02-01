import { createClient } from 'contentful'

interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}
 

 const projectsData2 = async() => {
 

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXt_PUBLIC_CONTENTFUL_ACCESS_KEY as string
  }) 
 
    
  const res = await client.getEntries({content_type: 'recipe', include: 2})
   
  return res.items
  

}

export default projectsData2
 