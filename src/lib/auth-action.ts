"use server"

import { createClient } from "@/app/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
 
export async function login(formData: FormData) {
    const supabase = createClient()
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    
    const { error } = await supabase.auth.signInWithPassword(data)
    
    if (error) redirect("/error")
    revalidatePath("/", "layout")
    redirect("/")
}


export async function signUp(formData: FormData) {
    const supabase = createClient()

    const firstName = formData.get("first-name") as string
    const lastName = formData.get("last-name") as string
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                full_name: `${firstName} ${lastName}`,
                email: formData.get("email") as string
            }
        }
    }

    const { error } = await supabase.auth.signUp(data)
    if (error) redirect("/error")
    revalidatePath("/", "layout")
    redirect("/")
}

export async function signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) redirect("/error")
    revalidatePath('/', 'layout')
    redirect("/logout")
    
}

export async function signInWithGoogle() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth(({
        provider: "google",
        options: {
            queryParams: {
                access_type: "offline",
                prompt: "consent"
            }
        }
    }))
    if (error) redirect("/error")
    redirect(data.url)
}