'use client'
import { useState, useEffect } from "react";

export default function DashboardMessages({ userSocket }) {

    const [messages, setMessages] = useState([])
    const [fetchStatus, setFetchStatus] = useState('loading ⏳')

    useEffect(() => {
        userSocket?.emit('get-user-messages', '')
        userSocket?.on('get-user-messages-success', (messages) => {
            messages = messages.filter(message => !message?.isRead)
            setMessages(messages)
            if (!messages?.length) setFetchStatus('no messages 📭')
            else setFetchStatus('')
        })
        userSocket?.on('new-private-notification', (message) => {
            setMessages(messages => [message, ...messages])
            setFetchStatus('new message 📬')
        })
    }, [userSocket])

    const markAllMessagesAsRead = () => {
        userSocket?.emit('mark-all-as-read')
        setMessages([])
        setFetchStatus('no messages 📭')
    }

    const markOneMessageAsRead = (message) => {
        delete message.message
        userSocket?.emit('mark-as-read', message)
        setMessages(messages => messages.filter(msg => msg._id != message._id))
        if (!messages.length) setFetchStatus('no messages 📭')
    }

    return (
        <>
            <aside className="flex flex-col min-w-full lg:min-w-[40vw] lg:w-[500px] h-max min-h-[300px] bg-gray-900 text-white rounded-[20px] p-5">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-[16px] lg:text-lg font-bold">📨 Personal Inbox</h1>
                    <button onClick={markAllMessagesAsRead} className="text-xs font-bold p-2 hover:bg-gray-600 rounded-full duration-100">Clear All</button>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    <h3 className={fetchStatus === 'loading ⏳'? "animate-pulse text-sm": "animate-none text-sm"}>{fetchStatus}</h3>
                    {
                        messages.reverse().map((message, index) => {
                            if(message?.isRead)
                                return
                            return (
                                <div key={index} className="block bg-gray-800 text-white rounded-md p-4 mb-4">
                                    <div className="flex flex-row justify-between items-center">
                                        <h3 className="text-sm">{new Date(message?.date).toLocaleString()}</h3>
                                        <button onClick={() => markOneMessageAsRead(message || undefined)} className="text-xs font-bold p-2 hover:bg-gray-600 rounded-full duration-100">Clear</button>
                                    </div>
                                    <p className="text-[14px] underline font-bold">{message?.title}</p>
                                    <p className="text-sm">{message?.message}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </aside>
        </>
    )
}