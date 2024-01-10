import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RecipeCard({ recipe }) {
    
    const { title, slug, cookingTime, thumbnail } = recipe.fields
    
    return (
        <div className='transform rotate-1'>
            <div className='featured'>
                <Image
                 src={'https:' + thumbnail.fields.file.url}
                 width={thumbnail.fields.file.details.image.width}
                 height={thumbnail.fields.file.details.image.height}
                 />
            </div>
            
            <div className='bg-white m-0 relative top-[-40px] left-[-10px] shadow-md'>
                <div className='p-4'>
                    <h4 className='px-1 uppercase'>{ title }</h4>
                    <p className='m-0 text-gray-600'>Takes approx {cookingTime } mins to make</p>
                </div>
                <div className='mt-5 flex justify-end'>
                    <Link href={ '/recipes/' + slug } className='text-white px-4 py-6 bg-red-600'> Cook this</Link>
                </div>
            </div>
        </div>
  )
}
