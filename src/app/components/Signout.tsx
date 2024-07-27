import React from 'react'
import { Box } from '@radix-ui/themes'  
 

export default function Signout() {
    
    return (
        <Box className='bg-gray-100 rounded p-2'>
             <div className='w-full flex justify-between'>
                <div>
                  Hi, Jones
                </div>
                <form>
                  <button type="submit">
                    Logout
                  </button> 
                </form> 
              </div> 
        </Box>  
    )
}

