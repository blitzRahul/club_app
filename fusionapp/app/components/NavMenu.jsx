'use client'
import { motion } from 'framer-motion'
import SignInButton from './SignInButton'
import Notifications from './Notifications'

export default function NavMenu({ navigationItems }) {
    return (
        <>
            {/* renders nav icons in top right corner */}
            <nav className='fixed top-5 right-5 z-20 flex flex-col h-max w-max gap-2 items-end'>
                {
                    navigationItems.map((item, index) => {
                        if (item.text === 'Alerts') {
                            return <Notifications item={item} key={item.text} />
                        }
                        else if (item.text === 'Dashboard') {
                            return <SignInButton key={item.text} />
                        }
                        else {
                            return (
                                <motion.a key={item.text} href={item.link}
                                    className='text-sm lg:text-lg shadow-sm shadow-gray-300 bg-white rounded-full w-10 h-10 p-2 lg:w-12 lg:h-12 justify-center items-center flex'
                                    onHoverStart={(e) => e.target.textContent = item.text}
                                    onHoverEnd={(e) => e.target.textContent = item.icon}
                                    whileHover={{ width: 150 }} transition={{ duration: 0.2 }}
                                >
                                    {item.icon}
                                </motion.a>
                            )
                        }
                    })
                }
            </nav>
        </>
    )
}