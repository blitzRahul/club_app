export default function InternalDetails({ session }) {

    return (
        <>
            <div className='flex flex-col justify-start items-start gap-3 min-w-[300px] w-full md:w-max md:min-w-[400px] h-max p-5 bg-gray-900 rounded-lg'>
                <div className="flex w-full items-center justify-between gap-10 mb-5">
                    <h5 className="text-xl font-bold leading-none text-white">👤&nbsp;&nbsp;Member Details</h5>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-gray-900 dark:text-white">Name</h6>
                    <p className="text-sm text-white">{capitalizeWords(session?.user?.name.slice(0, -11))}</p>
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
                    <h6 className="text-sm font-bold text-white">Role</h6>
                    <p className="text-sm text-white">{session?.user?.role}</p>
                </div>
            </div>
        </>
    )
}

function capitalizeWords(str) {
    return str?.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
}
