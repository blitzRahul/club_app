'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function DashboardSlots({ userSocket }) {

    const { data: session } = useSession()
    const [slots, setSlots] = useState(['loading ⏳'])

    useEffect(() => {
        userSocket?.emit('get-slots', session?.user?.regNum)
        userSocket?.on('get-slots-success', (slots) => {
            setSlots(slots)
            if (!slots?.length) setSlots(['please tap edit to update ↗️'])
        })
    }, [userSocket])

    return (
        <>
            <div className='flex flex-col justify-center items-start gap-3 w-[400px] h-max p-5 bg-gray-900 text-white rounded-lg'>
                <div className="flex w-full items-center justify-between gap-10 mb-5">
                    <h5 className="text-xl font-bold leading-none text-white">🗓️ Your Timetable</h5>
                    <a href="/dashboard/slots" className="text text-sm text-blue-600 hover:underline">Edit</a>
                </div>
                <p>{slots.map((item, index) => {
                    if (index == 0) return (
                        <span key={index} className="text-sm text-white">{item}</span>
                    )
                    return (
                        <span key={index} className="text-sm text-white"> &nbsp;+ {item}</span>
                    )
                })}</p>
            </div>
        </>
    )
}
