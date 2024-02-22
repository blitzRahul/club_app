function UserSlots({ slots, regNum }) {
    return (
        <>
            <div className='flex flex-col justify-center items-start gap-3 max-w-[400px] w-full h-max p-5 bg-gray-900 text-white rounded-lg'>
                <div className="flex w-full items-center justify-between gap-10 mb-5">
                    <h5 className="text-lg font-bold leading-none text-white">🗓️ {regNum} Timetable</h5>
                </div>
                <p className="text-sm">{slots.length ? '' : '🔴 no slots added'}</p>
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

export default UserSlots