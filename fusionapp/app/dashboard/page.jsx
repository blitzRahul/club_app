'use client'
import { useEffect, useState } from "react"
import { connectToUserSocket } from "../components/socketHandler"
import DashboardDetails from "../components/Dashboard/DashboardDetails"
import DashboardSlots from "../components/Dashboard/DashboardSlots"
import DashboardEvents from "../components/Dashboard/DashboardEvents"
import DashboardMessages from "../components/Dashboard/DashboardMessages"
import DashboardTickets from "../components/Dashboard/DashboardTickets"

export default function Dashboard() {

    const [userSocket, setUserSocket] = useState(null)

    useEffect(() => {
        initializeUserSocket()
    }, [userSocket])

    const initializeUserSocket = async () => {
        try {
            const token = await fetch('/api/protected/socketToken').then(res => res.json()).then(data => data.token)
            const userSocket = connectToUserSocket(token)
            userSocket.on('connect', () => {
                console.log('Connected to user socket')
                setUserSocket(userSocket)
            })
            userSocket.on('disconnect', (reason) => {
                if (reason === "io server disconnect") userSocket.connect();
            })
        }
        catch (err) {
            console.log('user socket error')
            console.log(err)
        }
    }

    return (
        <main className="flex flex-col h-max min-h-screen w-screen bg-fusion-purple bg-center p-5 gap-3 items-center justify-start">

            <header className="flex w-full h-max p-5 bg-gray-900 rounded-md justify-between items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">The Dashboard (⌐■_■)</h1>
                <a href="/" className="text-white border-b-2 border-transparent duration-75 hover:border-white">Home</a>
            </header>
            
            <section className="flex flex-row flex-wrap w-full min-h-[700px] gap-5 p-5 h-max rounded-lg bg-gray-200 backdrop-blur-lg bg-opacity-50">

                <DashboardDetails userSocket={userSocket} />
                <DashboardEvents userSocket={userSocket} />
                <DashboardMessages userSocket={userSocket} />
                <DashboardTickets userSocket={userSocket} />
                <DashboardSlots userSocket={userSocket} />

            </section>

        </main>
    )
}
