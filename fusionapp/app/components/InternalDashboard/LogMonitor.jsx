'use client'
import { useState, useEffect } from "react";
import LogSearchResults from "./LogSearchResults";

export default function LogMonitor({ adminSocket }) {

    const [logs, setLogs] = useState([])
    const [miniView, setMiniView] = useState([])
    const [filteredLogs, setFilteredLogs] = useState([])
    const [showFiltered, setShowFiltered] = useState(false)
    const [tags, setTags] = useState([])
    const [fetchStatus, setFetchStatus] = useState('loading ⏳')
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        document.addEventListener('keypress', handleKeypress)
        adminSocket?.emit('get-logs')
        adminSocket?.on('get-logs-success', (logs) => {
            selectLogsForMiniView(logs)
            setLogs(logs)
            if (!logs?.length) setFetchStatus('no logs 🪵')
            else setFetchStatus('')
        })
        adminSocket?.on('get-logs-failure', (err) => {
            setFetchStatus('error fetching logs!')
        })
        adminSocket?.on('search-logs-success', (logs) => {
            setFilteredLogs(logs)
            setShowFiltered(true)
            setFetchStatus('')
            setTags([])
        })
        return () => document.removeEventListener('keypress', handleKeypress)
    }, [adminSocket])

    const selectLogsForMiniView = (logs) => {
        const warnings = logs.filter((log) => log?.level === 'warn').slice(0, 5)
        setMiniView(warnings)
    }

    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            const field = document.getElementById('log-search')
            const searchToken = field.value.trim().toLowerCase()
            if (!searchToken) return
            field.value = ''

            const collectedTags = findTags(searchToken)
            setTags(tags => [...tags, ...collectedTags])
        }
    }

    const findTags = (searchToken) => {
        let collectedTags = []

        const roleRegex = /user|core|lead|star/
        let roleMatch = searchToken.match(roleRegex)
        if (roleMatch) collectedTags.push('role:' + roleMatch[0])
        while (roleMatch) {
            searchToken = searchToken.replace(roleMatch[0], '').trim()
            roleMatch = searchToken.match(roleRegex)
            if (roleMatch) collectedTags.push('role:' + roleMatch[0])
        }

        const regNumRegex = /\d{2}[A-Za-z]{3}\d{5}/
        let regNumMatch = searchToken.match(regNumRegex)
        if (regNumMatch) collectedTags.push('regNum:' + regNumMatch[0].toUpperCase())
        while (regNumMatch) {
            searchToken = searchToken.replace(regNumMatch[0], '').trim()
            regNumMatch = searchToken.match(regNumRegex)
            if (regNumMatch) collectedTags.push('regNum:' + regNumMatch[0].toUpperCase())
        }

        const levelRegex = /info|error|warn/
        let levelMatch = searchToken.match(levelRegex)
        if (levelMatch) collectedTags.push('level:' + levelMatch[0])
        while (levelMatch) {
            searchToken = searchToken.replace(levelMatch[0], '').trim()
            levelMatch = searchToken.match(levelRegex)
            if (levelMatch) collectedTags.push('level:' + levelMatch[0])
        }

        const fromDateRegex = /from:[A-Za-z0-9\-\/]+[,]?(\d{2}:\d{2})?/
        let fromDateMatch = searchToken.match(fromDateRegex)
        if (fromDateMatch) {
            setTags(tags => tags.filter(tag => !tag.includes('from')))
            collectedTags.push(fromDateMatch[0])
        }

        const toDateRegex = /to:[A-Za-z0-9\-\/]+[,]?(\d{2}:\d{2})?/
        let toDateMatch = searchToken.match(toDateRegex)
        if (toDateMatch) {
            setTags(tags => tags.filter(tag => !tag.includes('to')))
            collectedTags.push(toDateMatch[0])
        }

        searchToken = searchToken
            .replace(roleRegex, '')
            .replace(regNumRegex, '')
            .replace(levelRegex, '')
            .replace(fromDateRegex, '')
            .replace(toDateRegex, '')
            .trim()
        if (searchToken) {
            setTags(tags => tags.filter(tag => !tag.includes('action')))
            collectedTags.push('action:' + searchToken)
        }

        return collectedTags
    }

    const handleSubmit = () => {
        if (!tags?.length) return
        const regNums = tags.filter(tag => tag.includes('regNum')).map(tag => tag.split(':')[1]) || []
        const roles = tags.filter(tag => tag.includes('role')).map(tag => tag.split(':')[1]) || []
        const levels = tags.filter(tag => tag.includes('level')).map(tag => tag.split(':')[1]) || []
        const actions = tags.filter(tag => tag.includes('action')).map(tag => tag.split(':')[1])[0] || []
        let from = tags.filter(tag => tag.includes('from')) || []
        let to = tags.filter(tag => tag.includes('to')) || []

        from = from ? new Date(from).getTime() : 0
        to = to ? new Date(to).getTime() : 0

        if(!adminSocket?.connected)
            adminSocket?.connect()
        adminSocket?.emit('search-logs', regNums, roles, levels, actions, from, to)
        setFetchStatus('searching 🔍')
        setTimeout(() => {
            setFetchStatus('')
        }, 3000);
    }

    const removeTag = (tag) => {
        setTags(tags.filter((t) => t !== tag))
    }

    return (
        <>
            {
                showAll && <LogSearchResults logs={logs} adminSocket={adminSocket} fetchStatus={fetchStatus} setShowAll={setShowAll} />
            }
            {
                showFiltered && <LogSearchResults logs={filteredLogs} adminSocket={adminSocket} fetchStatus={fetchStatus} setShowAll={setShowFiltered} />
            }
            <aside className="flex flex-col min-w-full lg:min-w-[40vw] h-max min-h-[300px] bg-gray-900 text-white rounded-[20px] p-5">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-[16px] lg:text-lg font-bold">🕵️ Log Monitor</h1>
                    <button onClick={() => adminSocket.emit('get-logs')} className="text-xs font-bold p-2 hover:bg-gray-600 rounded-full duration-100">Refresh 🔄</button>
                </div>
                <p className={fetchStatus.includes('ing') ? "animate-pulse text-sm" : "animate-none text-sm"}>{fetchStatus}</p>
                <div className="flex flex-col h-full w-full gap-1 mt-5 justify-center items-center">
                    {
                        miniView?.map((log, index) => {
                            return (
                                <div key={index} className={`flex flex-row text-xs md:text-sm items-center text-left w-full h-max justify-between ${logStyle[log?.level]} text-white rounded-md px-1 gap-2`}>
                                    <h3 className="text-sm">{new Date(log?.timestamp).toLocaleString()}</h3>
                                    <p className="text-[14px]">{log?.role} - {log?.action}</p>
                                    <p className="text-sm">{log?.regNum}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={() => { setShowAll(!showAll); scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }} className="text-sm w-max self-center px-3 font-bold p-1 mt-3 hover:bg-gray-600 rounded-full duration-100">View All</button>
                <input id="log-search" type="text" autoComplete="off" maxLength={50} className="bg-gray-800 text-white rounded-md p-2 mt-5 focus:outline-none focus:ring-blue-700 focus:ring-2" placeholder="search logs 🔍" />
                <p className="text-[10px] mt-2 italic">* type a role, regnum or action and hit enter</p>
                <div className="flex flex-row flex-wrap h-max w-full items-start justify-start gap-1">
                    {
                        tags?.map((tag, index) => {
                            if (!tag) return null
                            return (
                                <p onClick={() => removeTag(tag)} key={index} className={`px-3 p-1 ${getTagStyle(tag)} rounded-full bg-blue-500 text-white text-xs mt-2`}>{tag}&nbsp;&nbsp;&nbsp;⤫</p>
                            )
                        })
                    }
                    <p onClick={handleSubmit} className={`px-3 p-1 ${tags?.length ? 'visible' : 'hidden'} hover:scale-[1.03] active:scale-95 rounded-full bg-white text-black text-xs mt-2`}>Search&nbsp;&nbsp;🔍</p>
                </div>
            </aside>
        </>
    )
}

const logStyle = {
    info: 'bg-gray-500',
    warn: 'bg-yellow-600',
    error: 'bg-red-500'
}

const getTagStyle = (tag) => {
    if (tag.includes('role')) return 'bg-blue-500'
    if (tag.includes('regNum')) return 'bg-sky-400'
    if (tag.includes('level')) return 'bg-gray-500'
    if (tag.includes('action')) return 'bg-blue-800'
    if (tag.includes('from')) return 'bg-red-500'
    if (tag.includes('to')) return 'bg-red-500'
}