"use client"
import { Button } from '@radix-ui/themes'
import { createBrowserClient } from '@supabase/ssr'
import React from 'react'

export default function OAuthForm() {
   
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const loginWithGithub = async() => { 
        const result = await
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/auth-server-actions/callback`
            }
        })

        if (result) console.log(result)
    } 
    
    return (
        <Button onClick={loginWithGithub}>Login with Github</Button>
    )
}
