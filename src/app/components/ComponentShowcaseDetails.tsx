import React from 'react'
import Image from 'next/image' 
import * as ScrollArea from '@radix-ui/react-scroll-area'

interface ComponentShowcaseDetailsProps {
  component: string
}

const ComponentShowcaseDetails:React.FC<ComponentShowcaseDetailsProps> = ({component} : {component: string}) => {

    // switch (component) {
    //     case 'tiles':

    //     case 'grout':

    //     default:
    // }

    // <Image
    // src="https://machucatile.com/1805/wp-content/uploads/2020/11/4-@thedraw.ingroom.jpg"
    // width={300}
    // height={300}
    // alt="Tiles" />
 
  return (
    <>  
        {/* <div>{component}</div> */}
        
        <div>
          
        </div>
       
        <ScrollArea.Root className='w-full h-[225px] rounded bg-gray-100'>
          <ScrollArea.Viewport className='w-full h-full rounded'>
            <div>
              <Image
              src="https://machucatile.com/1805/wp-content/uploads/2020/11/4-@thedraw.ingroom.jpg"
              width={300}
              height={300}
              alt="Tiles" /> 
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation='vertical'>
            <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className='bg-blackA5' />
        </ScrollArea.Root>
    </>
  )
}

export default ComponentShowcaseDetails