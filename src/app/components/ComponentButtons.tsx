import React from 'react'

const ComponentButtons = ({component} : {component: string}) => {
  return (
    <>
        <div className='p-2 bg-opacity-80 bg-white'>
            <div className='text-sm flex gap-2 sm:flex-col flex-wrap justify-between'>
                <div>Tiles</div>
                <div>Painting</div>
                <div>Modular Cabinets</div>
                <div>Simple Shelves</div>
                <div>Ceiling</div>
                <div>Roofing</div>
                <div>Ground Slab</div>
                <div>Suspended Slab (2nd floor or above)</div> 
            </div>
        </div>
    </>
  )
}

export default ComponentButtons