"use client"
 
import React, { useEffect, useState } from 'react' 
import { createClient } from '../../../utils/supabase/client'

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
    
        <div>DemoClientComponent</div>  
  )
}

export default DemoClientComponent