export default function Ticket({ ticket }) {

    const { 
        email, regNum, phone, teamName, uuid, members, checkin,
        checkout, utr, amount, event, type, verified, used, created 
    } = ticket

    return (
        <article className="flex w-full md:w-[500px] lg:w-[600px] h-max flex-col">
            <section className="flex hover:scale-[1.02] gap-5 active:scale-[0.98 duration-200 bg-black items-center justify-center text-white flex-col self-center h-max w-full bg-gradient-to-br from-blue-500 via-violet-600 to-pink-500 rounded-xl p-5">
                <p className="text-2xl bg-white text-center p-3 px-5 text-fusion-purple rounded-xl font-bold">{eventNames[event]}</p>
                <div className="flex flex-row flex-wrap gap-5 items-center justify-start w-full h-max">
                    <div className="flex flex-col gap-1 items-center bg-white text-black p-3 rounded-xl justify-around w-full h-52">
                        <p className="text-xl font-bold border-b-2 w-full text-center pb-3 border-black">Registration</p>
                        <p className="text-lg font-bold">{regNum}</p>
                        <div className="flex flex-row gap-3 text-sm items-center justify-around">
                            { phone && <a className="text-white bg-blue-600 text-center hover:scale-105 active:scale-95 hover:bg-blue-400 p-2 px-5 rounded-full" href={`tel:${phone}`}>📞 Call</a> }
                            { email && <a className="text-white bg-blue-600 text-center hover:scale-105 active:scale-95 hover:bg-blue-400 p-2 px-5 rounded-full" href={`mailto:${email}`}>📧 Email</a> }
                            <p className="text-white bg-sky-500 text-center p-2 px-5 rounded-full">{new Date(created).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 items-center bg-white text-black p-3 rounded-xl justify-around w-full h-52">
                        <p className="text-xl font-bold border-b-2 w-full text-center pb-3 border-black">Payment</p>
                        <p className="text-sm">{utr || '[redacted]'}</p>
                        <div className="flex flex-row text-xs md:text-sm gap-3 items-center justify-around">
                            <p className="text-white bg-sky-500 p-2 text-center px-5 rounded-full">₹{amount || '00'}.00</p>
                            <p className="text-white bg-sky-500 p-2 text-center px-5 rounded-full">{verified? '🟢 verified': '🔴 unverified'}</p>
                            <p className="bg-sky-500 text-white p-2 text-center px-3 rounded-full">{used? '🔴 used': '🟢 valid'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 items-center bg-white text-black p-3 rounded-xl justify-around w-full h-52">
                        <p className="text-lg font-bold border-b-2 w-full text-center pb-3 border-black">Team {teamName}</p>
                        <div className="flex flex-row flex-wrap h-max w-full text-center items-center justify-center gap-3">
                            {
                                members.map((member, index) => {
                                    return <span key={index} className="text-sm">{member || 'none'}&nbsp;</span>
                                })
                            }
                        </div>
                        <div className="flex flex-row gap-3 text-xs md:text-sm items-center justify-around">
                            {
                                type && <p className="bg-sky-500 text-white p-2 px-3 text-center rounded-full">{type}</p>
                            }
                            {
                                checkin && <p className="bg-sky-500 text-white p-2 px-3 text-center rounded-full">{new Date(checkin).toLocaleString()}</p>
                            }
                            {
                                checkout && <p className="bg-sky-500 text-white p-2 px-3 text-center rounded-full">{new Date(checkout).toLocaleString()}</p>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

const eventNames = {
    ethnixia: 'Ethnixia 2023',
    solidarity: 'Solidarity Summit',
    trapped: 'Trapped! - The Escape Room',
    himym: 'How I Met Your Murderer!',
    tourdefusion: 'World Bicycle Day',
    cosplay: 'Cosplay Culture',
    tokencity: 'Token City - AdVITya 2024',
}
