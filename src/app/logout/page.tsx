"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Logout = () => {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => router.push('/'), 2000)
    }, [])
  return (
    <div>You have logged out. Redirecting...</div>
  )
}

export default Logout