'use client'
import { useEffect, useState } from "react"
import UserDetails from "./UserDetails"
import UserSlots from "./UserSlots"
import UserTickets from "./UserTickets"
import CandidateDetails from "./CandidateDetails"

function PowerSearchResults({ user, adminSocket, setShowExpandedView }) {

    const [tickets, setTickets] = useState([])

    useEffect(() => {
        adminSocket?.emit('get-user-tickets', user.regNum)
        adminSocket?.on('get-user-tickets-success', (tickets) => {
            setTickets(tickets)
        })
        adminSocket?.on('get-user-tickets-failure', () => {
            setTickets(['error fetching tickets!'])
        })
    }, [adminSocket])

    return (
        <aside id="power-search-results" className="flex flex-col absolute top-16 left-0 no-scrollbar p-1 w-full items-center justify-start bg-fusion-pink rounded-lg">
            <div className="flex flex-col md:flex-wrap lg:flex-row items-start min-h-[300vh] md:min-h-[200vh] lg:min-h-screen h-max lg:h-full gap-3 justify-start rounded-md bg-fusion-purple w-full p-5 md:px-10">
                <div onClick={() => scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className="flex mb-5 fixed top-0 left-0 flex-row w-full justify-between items-center bg-gray-900 text-white p-5 rounded-md">
                    <h1 className="text-[16px] lg:text-lg font-bold">🌍 Power Search</h1>
                    <div className="flex flex-row gap-1 md:gap-3">
                        <button onClick={() => setShowExpandedView(false)} className="text-xs md:text-sm w-max self-center px-3 font-bold p-2 hover:bg-gray-600 border-gray-400 border-[1px] rounded-full duration-100">Close ❎</button>
                    </div>
                </div>
                <UserDetails user={user} />
                <CandidateDetails user={user} />
                <UserTickets tickets={tickets} regNum={user.regNum} />
                <UserSlots slots={user?.slots} regNum={user.regNum} />
            </div>
        </aside>
    )
}

export default PowerSearchResults