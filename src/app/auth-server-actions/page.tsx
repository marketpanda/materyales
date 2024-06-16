import React from 'react'
import readUserSession from '../lib/actions'
import { redirect } from 'next/navigation'

export default async function page() {
    const {data} = await readUserSession()

    if (!data.session) {
        return redirect("/login")
    }

     
}