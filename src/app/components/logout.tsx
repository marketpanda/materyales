"use server"
import React from 'react'
import createSupabaseServerClient from '../lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function logout() {
   
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
    redirect('/')

}
