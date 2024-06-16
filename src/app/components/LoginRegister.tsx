import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

function LoginRegister() {


  return (
    <div className='flex justify-end w-full gap-2 mb-2'>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/register">
        <Button>Register</Button>
      </Link>
    </div>
  )
}

export default LoginRegister