'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function DashboardDetails({ userSocket }) {

    const { data: session } = useSession()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('*Other fields like name and email cannot be updated')
    const [phone, setPhone] = useState('loading...')
    const [isEditingPhone, setIsEditingPhone] = useState(false)

    useEffect(() => {
        userSocket?.emit('get-phone', session?.user?.regNum)
        userSocket?.on('get-phone-success', (phone) => {
            setPhone(phone)
            setError('')
            if (phone == 'none') setIsEditingPhone(true)
        })
        userSocket?.on('update-phone-success', (phone) => {
            setTimeout(() => {
                setIsEditingPhone(false)
                setMessage('*Other fields like name and email cannot be updated')
            }, 500);
            setMessage('✅ Saved')
            setPhone(phone)
            setError('')
        })
        userSocket?.on('update-phone-error', (err) => setError('please try again'))
    }, [userSocket])

    const submitPhoneNumber = async () => {
        setError('')
        const phoneField = document.getElementById('phone-field');
        const phoneNumber = phoneField.value.trim();

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setError('Please enter a valid 10 digit number');
            return;
        }

        updatePhoneNumber(phoneNumber)
    }

    const updatePhoneNumber = (phoneNumber) => {
        if(!userSocket?.connected)
            userSocket?.connect()
        userSocket?.emit('update-phone', phoneNumber)
    }

    return (
        <>
            <div className='flex flex-col justify-start items-start gap-3 min-w-[300px] w-full md:w-max md:min-w-[400px] h-max p-5 bg-gray-900 rounded-lg'>
                <div className="flex w-full items-center justify-between gap-10 mb-5">
                    <h5 className="text-xl font-bold leading-none text-white">👤 Your Details</h5>
                    <button onClick={() => setIsEditingPhone(true)} className="text text-sm text-blue-600 hover:underline">Edit</button>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-gray-900 dark:text-white">Name</h6>
                    <p className="text-sm text-white">{capitalizeWords(session?.user?.name)}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-white">Regnum</h6>
                    <p className="text-sm text-white">{session?.user?.regNum}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-white">Email</h6>
                    <p className="text-xs text-white">{session?.user?.email}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-white">Phone</h6>
                    <p className="text-sm text-white">{phone || 'none'}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-white">Role</h6>
                    <p className="text-sm text-white">{session?.user?.role}</p>
                </div>
                {
                    isEditingPhone && <aside className="flex flex-col absolute h-[100%] w-full bg-opacity-50 bg-gray-500 backdrop-blur-sm top-0 left-0 justify-start items-center">
                        <div className="flex flex-col w-96 h-max p-5 bg-gray-900 rounded-lg gap-10 mt-10">
                            <div className="flex flex-col justify-between items-start w-full gap-5">
                                <h6 className="text-sm font-bold text-white">Please enter a valid 10 digit number</h6>
                                <input id="phone-field" className="text-sm text-white py-3 px-1 border-b-2 bg-gray-900 outline-none" type="tel" maxLength={10} name="phone" placeholder="10 digit number" />
                            </div>
                            <div>
                                <button onClick={submitPhoneNumber} className="px-3 w-max py-1 text-sm font-bold text-white bg-fusion-purple rounded-lg">Update</button>
                                <button onClick={() => { setIsEditingPhone(false); setMessage('*Other fields like name and email cannot be updated'); setError('') }} className="px-3 w-max py-1 text-sm font-bold text-white rounded-lg">Close</button>
                            </div>
                            <div>
                                <h6 className="text-[12px] text-gray-300">{message}</h6>
                                <h6 className="text-red-400 text-[12px]">{error}</h6>
                            </div>
                        </div>
                    </aside>
                }
            </div>
        </>
    )
}

function capitalizeWords(name) {
    const regnumRegex = /\d{2}[a-zA-Z]{3}\d{5}/;
    if(regnumRegex.test(name))
        name = name.slice(0, -11)
    return name?.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
}
