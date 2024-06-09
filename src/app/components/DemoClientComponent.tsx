"use client"
 
import React, { useEffect, useState } from 'react' 
import { createClient } from '../../../utils/supabase/client'
import { Box } from '@radix-ui/themes'
import { logout } from '../logout/actions'

const DemoClientComponent = () => {
    const [user, setUser] = useState<any | null>(null)

    useEffect(() => {

        async function getUser() {

            const supabase = createClient()
            const { data, error } = await supabase.auth.getUser()
            
            if (error || !data?.user) {
                console.log(error?.message)
            } else {
                setUser(data.user)
            }
        }

        getUser()

    }, [])

    console.log(user)

    return (
    
        <Box className='bg-gray-100 rounded p-2'>
             <div className='w-full flex justify-between'>
                <div>
                    Hi, Jones
                </div>
                <form action={logout}>
                  <button type="submit">
                    Logout
                  </button>

                </form>

              </div> 
            
        </Box>  
  )
}

export default DemoClientComponent