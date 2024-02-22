'use client'
import { useState, useEffect } from "react"

export default function SendNotificationBox({ adminSocket }) {

    useEffect(() => {
        adminSocket?.on('send-notification-success', () => {
            setSending('✅ Sent')
            document.getElementById('title').value = ''
            document.getElementById('message').value = ''
            document.getElementById('regNum').value = ''
        })
        adminSocket?.on('send-notification-failure', () => {
            setSending('❌ Failed')
        })
    }, [adminSocket])

    const [sending, setSending] = useState('Send')

    const sendNotification = () => {
        if (sending === 'Sending') return
        setSending('Sending')
        const title = document.getElementById('title').value
        const message = document.getElementById('message').value
        let regNums = document.getElementById('regNum').value.toUpperCase().trim()
        if (regNums) {
            regNums = regNums.split(',')
            regNums.forEach(regNum => {
                regNum = regNum.trim()
                if (!adminSocket?.connected)
                    adminSocket?.connect()
                adminSocket?.emit('send-notification', title, message, regNum)
            })
        }
        else {
            if (!adminSocket?.connected)
                adminSocket?.connect()
            adminSocket?.emit('send-notification', title, message, 'all')
        }
        setTimeout(() => {
            setSending('Send')
        }, 2000);
    }

    return (
        <>
            <div className='flex flex-col justify-start items-start gap-3 min-w-[300px] w-full md:w-max md:min-w-[400px] h-max p-5 bg-gray-900 rounded-lg'>
                <div className="flex w-full items-center justify-between gap-10 mb-3">
                    <h5 className="text-xl font-bold leading-none text-white">📤&nbsp;&nbsp;Send Notification</h5>
                </div>
                <input id="regNum" type="text" placeholder="Reg Num" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-gray-300">*leave this blank to broadcast to all</p>
                <input id="title" type="text" autoComplete="off" placeholder="Title" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input id="message" type="text" autoComplete="off" placeholder="Message" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={sendNotification} className="p-2 hover:scale-[1.05] active:scale-95 bg-blue-500 text-white text-sm rounded-md">{sending}</button>
            </div>
        </>
    )
}
