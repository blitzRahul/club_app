'use client'
import { useState, useEffect } from "react"
import PowerSearchResults from "./PowerSearchResults"

export default function PowerSearch({ adminSocket }) {

    const [suggestions, setSuggestions] = useState([])
    const [user, setUser] = useState(null)
    const [expandedView, setExpandedView] = useState(false)

    useEffect(() => {
        adminSocket?.on('power-search-suggestions', (data) => {
            setSuggestions(data)
        })
    }, [adminSocket])

    const handleInputChange = (e) => {
        const inputValue = e.target.value.trim()
        const allowedTags = ['name', 'phone', 'regNum', 'email']
        const field = inputValue.split(':')[0]
        if (allowedTags.includes(field))
            var value = inputValue.split(':')[1]
        if (!value) return
        if(!adminSocket?.connected)
            adminSocket?.connect()
        adminSocket?.emit('suggest-power-search', field, value)
    }

    const handleUserSelection = (user) => {
        console.log(user)
        setUser(user)
        setExpandedView(true)
        scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    return (
        <>
            {expandedView && <PowerSearchResults user={user} adminSocket={adminSocket} setShowExpandedView={setExpandedView} />}
            <div className='flex flex-col justify-center items-start text-white gap-3 min-w-full lg:min-w-[500px] h-max p-5 bg-gray-900 rounded-lg'>
                <h3 className="text-xl font-bold w-full text-left">Power Search&nbsp;&nbsp;🌍</h3>
                <input id="power-search" onChange={handleInputChange} type="text" className="w-full h-max p-2 bg-gray-800 focus:outline-none focus:outline-blue-600 rounded-md" placeholder="search for users" />
                <p className="text-xs italic">* tags - name, phone, regNum, email</p>
                <div
                    className="flex bg-transparent p-1 rounded-md flex-col items-start justify-start w-full min-h-[200px] max-h-[200px] duration-100 overflow-y-scroll gap-1"
                >
                    {
                        suggestions?.map((user, index) => {
                            return (
                                <p onClick={() => handleUserSelection(user)} key={index} className={`text-xs md:text-sm bg-gray-800 border-[1px] border-transparent hover:scale-[1.01] duration-100 active:scale-[0.99] hover:border-white text-white p-3 w-full rounded-md`}>{user.name}</p>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )

}
