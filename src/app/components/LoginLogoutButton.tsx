"use client"

import { signOut } from '@/lib/auth-action';
import * as NavigationMenu from '@radix-ui/react-navigation-menu'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react' 
import { createClient } from '../utils/supabase/client';

const LoginLogoutButton = () => { 

    const [user, setUser] = useState<any>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchUser = async() => {
            const { data: { user }} = await supabase.auth.getUser()
            setUser(user)
        }
        fetchUser()
    }, [])
    return (
        <>
            {
                !user ? (
                        <>
                            <NavigationMenu.Item>
                                <NavigationMenu.Link asChild
                                className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]">
                                    <Link href='/login'>
                                        <button>Login</button> 
                                    </Link> 
                                </NavigationMenu.Link>
                            </NavigationMenu.Item>
                            <NavigationMenu.Item>
                                <NavigationMenu.Link asChild
                                className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]">
                                    <Link href='/register'>
                                        <button>Register</button> 
                                    </Link> 
                                </NavigationMenu.Link>
                            </NavigationMenu.Item>
                        </> 
                ) : 
                (
                    <NavigationMenu.Item>
                        <NavigationMenu.Link asChild
                        className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]">
                            <button onClick={() => { signOut() }}>Logout</button> 
                        </NavigationMenu.Link>
                    </NavigationMenu.Item> 
                )
            }
        </> 
    )
}

export default LoginLogoutButton