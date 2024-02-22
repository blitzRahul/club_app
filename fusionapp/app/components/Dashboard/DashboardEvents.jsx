export default function DashboardEvents({ userSocket }) {
    return (
        <>
            <div className='flex flex-col justify-center items-start text-white gap-5 w-full max-w-[600px] h-max p-5 duration-200 bg-gradient-to-br hover:bg-gradient-to-tr from-violet-500 to-fuchsia-500 via-indigo-500 border-2 border-white rounded-lg'>
                <h3 className="text-xl font-bold border-b-2 w-full pb-5 mb-2 text-center border-dashed">Open Events&nbsp;&nbsp;🎉</h3>
                <div className="flex flex-col gap-3 items-center justify-center w-full h-max border-black border-dashed border-2 p-2 rounded-lg">
                    <p>We're recruiting new core team members!</p>
                    <a href="/recruitment" className="flex flex-row items-center p-2 duration-100 hover:border-black border-transparent text-black border-2 gap-2 rounded-lg bg-white text-base font-bold"><span className="animate-ping text-[8px]">🟢</span><span>Click here to apply!</span></a>
                </div>
                <a href="/tokencity" className="flex flex-row gap-3 items-start justify-start w-full h-max bg-white rounded-lg hover:border-black border-transparent text-black border-2 p-2">
                    <img src="/tokencity.avif" alt="tokencity icon" className="w-28 h-28 rounded-lg" />
                    <div className="flex flex-col w-full h-max gap-2">
                        <h3 className="flex flex-row bg-black text-white rounded-lg p-1 text-lg px-3 justify-center text-center">Register for Token City 🎯</h3>
                        <p>Our upcoming event on 22 Feb, during VITB's AdVITya 2024 fest! Click to buy a pass, which includes tokens to play games with.</p>
                    </div>
                </a>
            </div>
        </>
    )
}