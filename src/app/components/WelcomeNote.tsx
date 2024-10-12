import React from 'react'  
 
import PatapatViaduct from '../../assets/patapat_viaduct.jpg'
import Image from 'next/image'
import Link from 'next/link'

const WelcomeNote = () => {  
    return  (
        <> 
            <Image src={PatapatViaduct} className='w-full' height={300} alt="Patapat Viaduct" />
            <div>
                Hello. Welcome to Materyales.
                The goal of this website is to help you breakdown construction costs, with focus on materials,
                be it a small DIY or a medium house project.
                The breakdown is done by category of materials (e.g. tileworks, painting works etc); they are broken 
                down to elements with unit cost and totalled by category. This is a work in progress and I will deploy changes
                from time to time.
                <br />
                Please click <Link href='materials/tiles' className='font-bold text-red-700' >here</Link>  to start 
            </div>
        </>
    )
}
export default WelcomeNote