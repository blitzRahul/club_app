'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function Unauthorised() {
    return (
        <main className='flex flex-col h-screen w-screen bg-black text-white items-center justify-center gap-5 text-lg'>
            <h1 className='text-xl'>Hi, you weren't supposed to find this!</h1>
            <a href='/' className='text-fusion-purple pb-1 hover:text-white hover:border-white text-sm border-b-2 border-fusion-purple'>
                return home ^_^
            </a>
        </main>
    )
}