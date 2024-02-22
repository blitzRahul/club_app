'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Ticket from '@/app/components/TicketCard';

const TicketPage = () => {
    const params = useSearchParams()
    const uuid = params.get('id')
    const [ticket, setTicket] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('loading');

    useEffect(() => {
        getTicket()
    }, []);

    const handleCopy = (e) => {
        navigator.clipboard.writeText(`https://thefusionclub.in/share/ticket?id=${ticket.uuid}`)
        e.target.textContent = 'public link copied 🎉'
        setTimeout(() => {
            e.target.textContent = 'copy sharing link 🔗'
        }, 3000);
    }

    const getTicket = async () => {
        const response = await fetch(`/api/public/ticket`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uuid: uuid }),
        })
            .catch(() => setFetchStatus('error'))
        if (response?.status === 200) {
            const ticket = await response.json()
            setTicket(ticket)
            setFetchStatus('success')
        }
        else setFetchStatus('error')
    }

    if (fetchStatus === 'loading')
        return (
            <main className='flex h-screen w-screen items-center gap-3 justify-center text-center bg-black text-white text-xl'>
                <p className='animate-pulse'>finding good memories</p>
                <p className='animate-spin'>⏳</p>
            </main>
        )

    else if (fetchStatus === 'success') {
        return (
            <main className='bg-gray-950 flex flex-col h-max w-screen justify-start gap-10 items-center text-white p-5'>
                <div className='bg-purple-500 w-full h-max flex flex-row p-5 rounded-md justify-between items-center'>
                    <div className='flex flex-row gap-3 items-center'>
                        <img className='h-10 w-auto' src='/mirrorball.png' />
                        <p className='text-xl font-bold'>The Fusion Club</p>
                    </div>
                    <a className='text-lg border-b-2 font-bold border-white' href="/">Home</a>
                </div>
                <Ticket ticket={ticket} />
                <p onClick={handleCopy} className='text-gray-400 w-[200px] text-center hover:bg-white rounded-md p-1 px-3 hover:text-gray-900 duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm'>copy sharing link 🔗</p>
            </main>
        )
    }

    else return (
        <main className='flex flex-col gap-3 h-screen w-screen items-center justify-center text-center bg-black text-white text-xl'>
            no application found 🫠
            <a href="/" className='underline text-base'>
                Return Home
            </a>
        </main>
    );

};

export default TicketPage;

