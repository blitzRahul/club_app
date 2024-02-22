'use client'
import { useSession } from "next-auth/react";
import Unauthorised from "../components/Unauthorised";
import { useState, useEffect } from "react";
import { connectToAdminSocket } from "../components/socketHandler";
import InternalDetails from "../components/InternalDashboard/InternalDetails";
import SendNotificationBox from "../components/InternalDashboard/SendNotificationBox";
import LogMonitor from "../components/InternalDashboard/LogMonitor";
import PowerSearch from "../components/InternalDashboard/PowerSearch/PowerSearch";

const allowedRoles = ['core', 'lead', 'star']

export default function InternalDashboard() {

    const { data:session, status:status } = useSession()
    const [adminSocket, setAdminSocket] = useState(null)

    useEffect(() => {
        if(session?.user?.role !== 'user') initAdminSocket()
    }, [adminSocket])

    const initAdminSocket = async () => {
        try {
            const token = await fetch('/api/protected/socketToken').then(res => res.json()).then(data => data.token)
            const adminSocket = connectToAdminSocket(token)
            adminSocket.on('connect', () => {
                console.log('Connected to admin socket')
                setAdminSocket(adminSocket)
            })
            adminSocket.on('disconnect', (reason) => {
                if (reason === "io server disconnect") adminSocket.connect();
            })
        }
        catch {
            console.log('admin socket error')
        }
    }

    if (status === 'loading') return (
        <>
            <div className="flex flex-col justify-center items-center bg-black text-white w-full h-screen gap-5">
                <h1 className="text-2xl font-bold">Internal Dashboard</h1>
                <p className="text-lg">Welcome, dear fusion member</p>
                <p className="text-sm animate-pulse">verifying...</p>
            </div>
        </>
    )

    if (allowedRoles.includes(session.user.role)) return (
        <>
            <main id="admin-panel" className="flex flex-col h-max min-h-screen w-screen bg-fusion-purple bg-center p-5 gap-3 items-center justify-start">

                <header className="flex w-full h-max p-5 bg-gray-900 rounded-md justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">Admin Panel</h1>
                    <a href="/" className="text-white border-b-2 border-transparent duration-75 hover:border-white">Home</a>
                </header>

                <section className="flex flex-row flex-wrap w-full min-h-[700px] gap-5 p-5 h-max rounded-lg bg-gray-200 backdrop-blur-lg bg-opacity-50">
                    <InternalDetails session={session} />
                    {session.user.role !== 'core' && <SendNotificationBox adminSocket={adminSocket} />}
                    <PowerSearch adminSocket={adminSocket} />
                    {session.user.role !== 'core' && <LogMonitor adminSocket={adminSocket} />}
                </section>

            </main>
        </>
    )

    else return <Unauthorised />
}