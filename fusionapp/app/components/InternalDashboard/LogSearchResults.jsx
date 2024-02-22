function LogSearchResults({ logs, adminSocket, fetchStatus, setShowAll }) {
    return <aside className="flex z-100 flex-col h-max no-scrollbar w-full items-center justify-start absolute top-0 left-0 bg-fusion-purple">
        <div onClick={() => scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className="flex fixed top-0 flex-row w-full justify-between items-center bg-gray-900 text-white p-5 rounded-md">
            <h1 className="text-[16px] lg:text-lg font-bold">🕵️ Log Monitor</h1>
            <div className="flex flex-row gap-1 md:gap-3">
                <button onClick={() => adminSocket?.emit('get-logs')} className="text-xs md:text-[14px] font-bold p-2 hover:bg-gray-600 border-gray-400 border-[1px] rounded-full duration-100">Refresh 🔄</button>
                <button onClick={() => setShowAll(false)} className="text-xs md:text-[14px] w-max self-center px-3 font-bold p-2 hover:bg-gray-600 border-gray-400 border-[1px] rounded-full duration-100">Close ❎</button>
            </div>
        </div>
        <div className="flex flex-col items-center justify-start mt-16 bg-fusion-purple min-h-[300vh] md:min-h-[200vh] lg:min-h-screen w-full p-5 md:px-10 lg:w-[60vw]">
            <p className={fetchStatus.includes('ing') ? "animate-pulse text-sm" : "animate-none text-sm"}>{fetchStatus}</p>
            <div className="flex flex-col h-max w-full gap-1 mt-5 justify-center items-center">
                {logs?.map((log, index) => {
                    return (
                        <div key={index} className={`flex flex-row text-xs md:text-sm items-center text-left w-full h-max justify-between ${logStyle[log?.level]} text-white rounded-md px-1 gap-2`}>
                            <h3 className="text-sm">{new Date(log?.timestamp).toLocaleString()}</h3>
                            <p className="text-[14px]">{log?.role} - {log?.action}</p>
                            <p className="text-sm">{log?.regNum}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </aside>;
}

const logStyle = {
    info: 'bg-gray-500',
    warn: 'bg-yellow-600',
    error: 'bg-red-500'
}

export default LogSearchResults