import { materials } from '@/common/materials'
import { Material } from '@/common/types'
import { Heading } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const ComponentButtons = ({component} : {component: string}) => { 
  return (
    <> 
            <div className='flex sm:flex-col flex-wrap justify-between w-full  bg-gray-100 backdrop-blur bg-opacity-50 text-md'>
              {
                materials.map((material:Material) => {
                  const { name, title } = material
                  return <Link href={`/materials/${name}`}
                    className='hover:bg-red-500 hover:text-white px-3 py-1 transition ease-in duration-200'
                    key={name}><h2>{title}</h2></Link>
                })
              }
            </div>
        
    </>
  )
}

export default ComponentButtons