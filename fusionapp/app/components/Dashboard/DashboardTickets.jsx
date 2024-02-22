'use client'
import { useState, useEffect } from "react";

export default function DashboardTickets({ userSocket }) {

    const [tickets, setTickets] = useState([])
    const [fetchStatus, setFetchStatus] = useState('loading ⏳')

    useEffect(() => {
        userSocket?.emit('get-tickets')
        userSocket?.on('get-tickets-success', (tickets) => {
            setTickets(tickets)
            if (!tickets?.length) setFetchStatus(['no tickets found 🎟️'])
            else setFetchStatus('')
        })
    }, [userSocket])

    return (
        <>
            <div className='flex flex-col justify-center items-start gap-2 w-[400px] h-max p-5 bg-gray-900 text-white rounded-lg'>
                <h5 className="text-xl font-bold text-white">🎟️&nbsp;&nbsp;Your Tickets</h5>
                <h3 className={fetchStatus === 'loading ⏳' ? "animate-pulse text-sm" : "animate-none text-sm"}>{fetchStatus}</h3>
                <div className="flex flex-row gap-2 flex-wrap">{tickets.map((ticket, index) => {
                    return (
                        <div onClick={() => window.location.href = `https://thefusionclub.in/ticket?id=${ticket?.uuid}`} key={index} className="flex flex-row items-center text-center text-sm md:text-sm w-max h-max bg-gradient-to-tr from-pink-400 hover:scale-[1.02] active:scale-95 hover:border-white border-2 border-transparent duration-200 to-purple-500 text-white rounded-md p-2">
                            <div>
                                <p className="text-lg font-bold">🪩 {ticket?.event?.toUpperCase()} PASS</p>
                                <p>{new Date(ticket.created).toDateString()}</p>
                            </div>
                        </div>
                    )
                })}</div>
            </div>
        </>
    )
}