"use server"
import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"

export const checkSession = async() => {
  const supabase = createClient()
  const { data: { session} } = await supabase.auth.getSession()
  if (session) redirect('/') 
}
