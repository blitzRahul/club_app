'use client'

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return(
        <button onClick={() => signOut({ callbackUrl: '/' })} className="p-1 px-3 bg-fusion-red rounded-full text-white hover:scale-[1.01] hover:shadow-gray-700 shadow-md duration-100" href="/">&nbsp;Logout ⎋</button>
    )
}