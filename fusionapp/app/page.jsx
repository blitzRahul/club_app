'use client'
import { motion } from 'framer-motion'
import NavMenu from './components/NavMenu'
import EventCard from './components/EventCard'
import { eventlist } from './components/eventlist'
import { useEffect, useState } from 'react'
import { generalSocket } from './components/socketHandler'
import Footer from './components/Footer'

export default function Home() {

  const [onlineCount, setOnlineCount] = useState(0)

  useEffect(() => {
    initializeGeneralSocket()
  })

  const initializeGeneralSocket = async () => {
    try {
      generalSocket.on('connect', () => console.log('Connected to general socket'))
      generalSocket.on('online-count', (count) => {
        setOnlineCount(count)
      })
      generalSocket.on('disconnect', (reason) => console.log(reason))
    }
    catch (err) {
      console.log(err)
    }
  }

  // const moveCoin = () => {
  //   const coin = document.getElementById('fusion-coin')
  //   let top = window.scrollY * 0.6
  //   let left = window.scrollY / 2
  //   if(left > window.innerWidth) left = 0
  //   if(top > window.innerHeight) top = 0
  //   coin.style.top = `${top}px`
  //   coin.style.left = `${left}px`    
  // }

  return (
    <main className="bg-white h-max w-screen no-scrollbar select-none flex flex-col">

      {/* renders navigation buttons and alerts in top right corner */}
      <NavMenu navigationItems={navigationItems} />

      {/* renders the secret mirrorball icon in top left corner */}
      <motion.img src="/mirrorball.png" alt="tiny mirrorball"
        className='fixed top-5 left-5 w-10 h-10'
        onClick={() => window.location.href = 'https://youtu.be/xvFZjo5PgG0'}
        onDoubleClick={() => window.location.href = '/internal'}
        whileHover={{ rotate: -20 }}
      />

      {/* renders the landing section */}
      <motion.section
        className="bg-fusion-rainbow-gradient bg-cover bg-no-repeat bg-top flex flex-col justify-center items-center min-h-screen w-full"
        initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
      >
        {/* the main FUSION logo */}
        <div className='flex flex-col self-center justify-center items-center gap-5'>
          <img src={'/fusionwhite.png'} alt={'Fusion Club logo'} className={'lg:w-[600px] w-[250px]'} />
          <h1 className="font-bold text-gray-100 text-2xl lg:text-4xl">The Fusion Club</h1>
          <p className="text-md leading-8 text-gray-400">VIT Bhopal</p>
        </div>
        <div className='flex flex-col justify-around items-center text-center gap-5 mt-10'>
          {/* TODO - enable these CTA buttons */}
          <a href='/tokencity' className='bg-fusion-purple text-gray-100 p-3 lg:px-5 text-sm lg:text-lg rounded-full duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[1px_3px_0px_0px] shadow-white'>Token City Event Registration&nbsp;&nbsp;↗️</a>
          <a href='/dashboard' className='bg-fuchsia-400 text-gray-100 p-3 lg:px-5 text-sm lg:text-lg rounded-full duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[1px_3px_0px_0px] shadow-white'>Recruitment Form&nbsp;&nbsp;↗️</a>
          {/* TODO - delete this warning */}
          {/* <p className='text-red-400 text-xs flex flex-col h-max w-[250px] mt-5 gap-3'>⚠️&nbsp;&nbsp; Site upgrade in progress! Read more by tapping the bell icon above ↗</p> */}
        </div>
      </motion.section>

      {/* renders the about-us section */}
      <motion.section id='about-us' className='flex bg-starry-night pb-[200px] bg-contain bg-repeat flex-col min-h-screen h-max w-screen'>

        {/* the coin with circular text */}
        <motion.div id='fusion-coin' className="relative top-0 left-0 w-24 h-24 lg:w-36 lg:h-36 rounded-full bg-fusion-circle-black bg-contain"
          drag dragConstraints={{ top: 100, left: 100, right: 100, bottom: 100 }} initial={{ rotate: -30 }} whileHover={{ rotate: 30, scale: 1.03 }} transition={{ duration: 0.3 }}
        />
        
        {/* three cards with info */}
        <motion.div className='mx-3 lg:mx-20 self-start rounded-md flex flex-col justify-center shadow-lg shadow-fusion-purple border-fusion-purple border-2 items-start gap-10 p-5 lg:p-10 bg-white w-[70%] lg:w-[40%] h-96' whileInView={{ y: 20, rotate: -3 }} transition={{ duration: 1 }} >
          <h1 className='text-xl font-bold'>About Us</h1>
          <p className='text-[12px] lg:text-lg'>{textContent.aboutUs}</p>
          <div>
            <p className='text-[10px] md:text-xs lg:text-sm'>✏️ Write to us at <a href="mailto:fusion@vitbhopal.ac.in" className='text-fusion-purple hover:underline'>fusion@vitbhopal.ac.in</a></p>
          </div>
        </motion.div>
        <motion.div className='mx-3 lg:mx-20 self-end rounded-md flex flex-col justify-center shadow-lg shadow-fusion-purple border-fusion-purple border-2 items-start gap-10 p-5 lg:p-10 bg-white w-[70%] lg:w-[40%] h-96' whileInView={{ y: 40, rotate: 3 }} transition={{ duration: 1 }} >
          <h1 className='text-xl font-bold'>Radictum in Caleo</h1>
          <p className='text-[12px] lg:text-lg'>{textContent.outMission}</p>
        </motion.div>
        <motion.div className='mx-3 lg:mx-20 self-start rounded-md flex flex-col justify-center shadow-lg shadow-fusion-purple border-fusion-purple border-2 items-start gap-10 p-5 lg:p-10 bg-white w-[70%] lg:w-[40%] h-96' whileInView={{ y: 60, rotate: -3 }} transition={{ duration: 1 }} >
          <h1 className='text-xl font-bold animate-pulse'>🟢 Live Stats</h1>
          <div className='flex flex-row lg:flex-row h-max w-full gap-3 text-[10px] md:text-[14px] lg:text-[16px]'>
            <p className='flex flex-col bg-fuchsia-300 h-[100px] w-full justify-between items-center border-black border-2 rounded-md p-3 lg:p-3'>💜 Tickets sold<code className='text-[16px] bg-white px-1 rounded-md mt-3 animate-pulse'>1815</code></p>
            <p className='flex flex-col bg-purple-300 h-[100px] w-full justify-between items-center border-black border-2 rounded-md p-3 lg:p-3'>🎪 Events done<code className='text-[16px] bg-white px-1 rounded-md mt-3 animate-none'>8</code></p>
            <p className='flex flex-col bg-fuchsia-300 h-[100px] w-full justify-between items-center border-black border-2 rounded-md p-3 lg:p-3'>👤 Online users<code className='text-[16px] bg-white px-1 rounded-md mt-3 animate-pulse'>{onlineCount}</code></p>
          </div>
        </motion.div>
      </motion.section>

      <section id='our-events' className="flex p-5 flex-col h-max min-h-screen w-screen justify-around items-center lg:p-16 bg-gradient-to-br from-fusion-purple to-fuchsia-500 via-blue-500">
        <h1 className='text-2xl lg:text-5xl font-bold mb-5 text-white'>🏆 Event Showcase</h1>
        <div className='flex flex-row flex-wrap gap-5 lg:gap-10 justify-center items-center bg-transparent w-full lg:p-10 h-max rounded-md mb-20'>
            <EventCard event={eventlist[1]} />
            <EventCard event={eventlist[4]} />
            <EventCard event={eventlist[6]} />
        </div>
        <a href='/events' className='bg-white hover:scale-[1.02] text-fusion-purple p-1 rounded-full px-3'>View All Events</a>
      </section>

      <Footer />

    </main>
  )
}

// array of objects containing navigation items
const navigationItems = [
  { text: 'Dashboard', link: '/dashboard', icon: '👤' },
  { text: 'Alerts', link: '#alerts', icon: '🔔' },
  // { text: 'About', link: '#about-us', icon: 'ℹ️' },
  { text: 'Events', link: '#our-events', icon: '🎭' },
  { text: 'Top', link: '#', icon: '🔝' },
]

// copy text for about us cards
const textContent = {
  aboutUs: 'Established in August 2022, The Fusion Club is not just an event management club in VIT Bhopal University; it is a culmination of artistry, innovation, and a relentless commitment to creating exceptional experiences. Each event we craft is a masterpiece, meticulously designed to leave an indelible mark on your heart.',
  outMission: 'We are rooted in the sky. Just as the roots of a tree anchor it to the earth while it reaches toward the heavens, we stay grounded in our commitment to students and their needs while aspiring to create events that transcend ordinary boundaries. We believe the sky is not the limit, it is just the beginning.',

}