"use client"
import { signInWithGoogle } from '@/lib/auth-action'
import React from 'react'

export default function OAuthForm() { 
    
    return (
        <button        
            onClick={() => signInWithGoogle()}
            className="mb-8 box-border w-full text-violet shadow-blackA4 hover:bg-purple-500 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-purple-800 text-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                Login with Google
        </button>
        
    )
}
