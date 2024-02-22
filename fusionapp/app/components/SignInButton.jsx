'use client'
import { useSession, signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { signOut } from "next-auth/react";

export default function SignInButton() {

    const { data: session } = useSession()
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    if (session) {
        return (
            <>
                <motion.button
                    className='text-sm lg:text-lg shadow-gray-300 shadow-sm bg-white rounded-full w-10 h-10 p-2 lg:w-12 lg:h-12 justify-center items-center flex'
                    onHoverStart={(e) => e.target.textContent = 'Dashboard'}
                    onHoverEnd={(e) => e.target.textContent = '👤'}
                    onClick={() => setIsPopUpOpen(!isPopUpOpen)}
                    whileHover={{ width: 150 }} transition={{ duration: 0.2 }}
                >👤</motion.button>
                {
                    isPopUpOpen && <motion.div className="fixed top-5 right-20 w-max z-10 h-max max-h-[500px] rounded-md shadow-md shadow-gray-800 bg-white flex flex-row justify-start gap-1 items-start p-2 px-5" initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, type: 'spring' }}>
                        <img src={session?.user?.image || '/mirrorball.png'} className="rounded-full w-10 h-10 self-center hover:-rotate-6 duration-100" />  
                        <div className='flex flex-col w-full justify-start items-start gap-1'>                     
                            <h1 className='flex font-bold text-sm px-2'>{session.user.firstName.length > 12 ? session.user.firstName.substring(0, 10).concat('...') : session.user.firstName} ({session.user.regNum})</h1>
                            <div className="flex flex-row justify-start w-full h-max items-center">
                                <button onClick={(e) => signOut({ callbackUrl: '/' })} className='text-red-500 text-xs hover:bg-red-100 p-1 px-2 rounded-full'>Logout ⎋</button>
                                <a href="/dashboard" className='text-fusion-purple text-xs hover:bg-gray-200 p-1 px-2 rounded-full'>Dashboard</a>
                                <button onClick={() => setIsPopUpOpen(false)} className='text-fusion-purple text-xs hover:bg-gray-200 p-1 px-2 rounded-full'>Close</button>
                            </div>
                        </div>
                    </motion.div>
                }
            </>
        )
    }

    else {
        return (
            <motion.button onClick={() => signIn()}
                className='text-sm lg:text-lg shadow-gray-300 shadow-sm bg-white rounded-full w-10 h-10 p-2 lg:w-12 lg:h-12 justify-center items-center flex'
                onHoverStart={(e) => e.target.textContent = 'Authenticate'}
                onHoverEnd={(e) => e.target.textContent = '🔑'}
                whileHover={{ width: 150 }} transition={{ duration: 0.2 }}
            >🔑</motion.button>
        )
    }
}