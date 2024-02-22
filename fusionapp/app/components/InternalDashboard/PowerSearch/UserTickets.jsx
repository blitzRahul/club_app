function UserTickets({ tickets, regNum }) {
    return (
        <>
            <div className='flex flex-col justify-center items-start gap-5 w-full md:w-[400px] h-max p-5 bg-gray-900 text-white rounded-lg'>
                <h5 className="text-xl font-bold text-white">🎟️ {regNum} Tickets</h5>
                { tickets.length == 0 && <h3 className="text-sm">No tickets found!</h3> }
                <div className="flex flex-row flex-wrap gap-2">{tickets.map((ticket, index) => {
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

export default UserTickets