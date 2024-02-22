import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { generalSocket } from './socketHandler'

export default function Notifications({ item }) {

    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        initializeGeneralSocket()
    }, [])

    const showOldNotifications = (oldNotifications) => {
        setNotifications(notifications => [...notifications, ...oldNotifications])
        setHasUnreadNotifications(true)
    }

    const showNewNotification = (notification) => {
        setNotifications(notifications => [...notifications, notification])
        setHasUnreadNotifications(true)
    }

    const initializeGeneralSocket = async () => {
        try {
            generalSocket.on('connect', () => console.log('Connected to general socket'))
            generalSocket.on('new-public-notification', showNewNotification)
            generalSocket.on('old-public-notifications', showOldNotifications)
            generalSocket.on('disconnect', (reason) => {
                if(reason !== "io server disconnect") generalSocket.connect()
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <motion.button key={item.text}
                className={'text-sm lg:text-lg shadow-gray-300 shadow-sm bg-white rounded-full w-10 h-10 p-2 lg:w-12 lg:h-12 justify-center items-center flex' + (hasUnreadNotifications ? ' border-red-500 border-2 animate-pulse' : '')}
                onClick={() => { setIsPopupOpen(!isPopupOpen); setHasUnreadNotifications(false) }}
                onHoverStart={(e) => e.target.textContent = item.text}
                onHoverEnd={(e) => e.target.textContent = item.icon}
                whileHover={{ width: 150 }} transition={{ duration: 0.2 }}
            >
                {item.icon}
            </motion.button>
            {
                isPopupOpen && <motion.div className='fixed top-24 right-20 w-64 lg:w-96 z-10 h-max overflow-y-scroll overflow-x-hidden max-h-[400px] min-h-[200px] bg-white rounded-md shadow-md shadow-gray-800 flex flex-col justify-start gap-5 items-start p-3' initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, type: 'spring' }}>
                    <div className='flex w-full justify-between items-center'>
                        <h1 className='flex font-bold text-md'>🔔&nbsp;&nbsp;Notifications</h1>
                        <div className='flex'>
                            <button onClick={() => setIsPopupOpen(false)} className='text-fusion-purple text-xs hover:bg-gray-200 p-1 px-2 rounded-full'>Close</button>
                        </div>
                    </div>
                    <div className='flex w-full flex-col mb-1 px-1 text-sm gap-2'>
                        <ul id='notification-list' className='flex flex-col h-max w-full'>
                            {
                                notifications.reverse().map((notification, index) => {
                                    return (
                                        <li key={index} className='flex flex-col border-dashed border-b-2 border-gray-700 py-2 h-max gap-2'>
                                            <span>
                                                <strong className='text-[16px]'>{notification.title}</strong>
                                                <h6 className='text-sm'>{new Date(notification.date).toLocaleString()}</h6>
                                            </span>
                                            <p className='text-xs'>{notification.message}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <p className='border-b-2 pb-3 border-dashed border-gray-700 text-red-500'>
                            Current ETA for site upgrade is <strong>5 days</strong>
                            <br></br>
                            Current Progress - 🟢🟢🟢🟢⚪️
                        </p>
                        <p className='border-b-2 pb-2 border-dashed border-gray-700'>
                            <strong>What's new in v2.0?</strong>
                            <br></br>
                            <span>
                                🔥&nbsp;&nbsp;Brand new detailed dashboard to view, download and manage your tickets
                                <br></br>
                                🏠&nbsp;&nbsp;Fresh, fun and informative home page with all our past events
                                <br></br>
                                🎫&nbsp;&nbsp;Improved event registration & entry experience
                            </span>
                        </p>
                    </div>
                </motion.div>
            }
        </>
    )
}