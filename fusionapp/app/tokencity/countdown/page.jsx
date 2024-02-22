'use client'
import React, { useState, useEffect } from 'react';

const Countdown = () => {
    const targetDate = new Date('February 9, 2024 10:00:00');
    const [countdown, setCountdown] = useState(Math.floor((targetDate - new Date()) / 1000));

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <main className="flex flex-col h-screen w-screen justify-center items-center bg-black text-purple-500 gap-10">
            <h1 className='text-2xl text-white'>Registrations open soon ⏳</h1>
            <div className="alarm-clock text-6xl">
                {formatTime(countdown)}
            </div>
            <p className='text-xl text-white'>hh:mm:ss</p>
        </main>
    );
};

export default Countdown;
