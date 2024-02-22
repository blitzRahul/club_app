'use client'
import { useState } from "react";
import { motion } from "framer-motion";

export default function EventCard({ event }) {

    // state variable to control the open/close state of the event card
    const [openEventCard, setOpenEventCard] = useState(-1)

    return (
        <motion.div layout onClick={() => setOpenEventCard(openEventCard !== event.key ? event.key : -1)}
            className={openEventCard === event.key ? 'flex flex-col z-20 relative h-max  w-[90%] lg:w-[600px] rounded-md bg-gray-100 shadow-md shadow-gray-600' : 'flex flex-col h-[200px] w-[300px] lg:w-[400px] rounded-[20px] lg:h-[300px] bg-gray-100 shadow-md shadow-gray-600'} 
            initial={{ opacity: 1 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.5, type: 'none' }} 
        >
            <motion.div layout className='flex flex-col justify-start items-center h-full w-full duration-500'>
                {
                    !(openEventCard == event.key) && <motion.div className='flex flex-col justify-start h-full w-full'>
                        <motion.img src={`${event.thumbnail}`} alt='Fusion Club' className='duration-300 rounded-t-[20px] h-[60%]' />
                        <motion.div className='flex flex-col justify-start items-start w-full h-full rounded-b-[20px] p-3'>
                            <h1 className='font-bold text-sm lg:text-2xl'>{event.name}</h1>
                            <h3 className='text-sm lg:leading-8 lg:text-[16px]'>{event.datePill}</h3>
                            <h6 className="mt-auto text-[10px] text-gray-500">Tap to know more</h6>
                        </motion.div>
                    </motion.div>
                }
                {
                    openEventCard == event.key && <motion.div className='flex flex-col justify-start items-start h-full w-full p-5 duration-300'>
                        <h1 className='font-bold text-xl lg:text-2xl'>{event.name}</h1>
                        <h3 className='text-md lg:text-lg'>{event.date}</h3>
                        <br />
                        <p className='text-sm lg:text-md max-w-full'>{event.description}</p>
                        <h6 className="mt-10 self-end text-[10px] text-red-500">Tap to close</h6>
                    </motion.div>
                }
            </motion.div>
        </motion.div>
    )
}