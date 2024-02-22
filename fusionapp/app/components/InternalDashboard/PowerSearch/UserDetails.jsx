function UserDetails({ user }) {
    return (
        <>
            <div className='flex flex-col justify-start items-start gap-3 w-full max-w-[400px] h-max p-5 bg-gray-900 rounded-lg'>
                <div className="flex w-full items-center justify-between gap-10 mb-5">
                    <h5 className="text-lg font-bold leading-none text-white">👤&nbsp;&nbsp;Details</h5>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-gray-900 dark:text-white">Name</h6>
                    <p className="text-sm text-white">{capitalizeWords(user?.name.slice(0, -11))}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-white">Regnum</h6>
                    <p className="text-sm text-white">{user?.regNum}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-white">Email</h6>
                    <p className="text-xs text-white">{user?.email}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-white">Role</h6>
                    <p className="text-sm text-white">{user?.role}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full pb-1 border-b-2 border-dotted border-gray-600">
                    <h6 className="text-sm font-bold text-white">Phone</h6>
                    <a href={`tel:${user?.phone}`} className="text-sm text-white">{user?.phone}</a>
                </div>
            </div>
        </>
    )
}

function capitalizeWords(str) {
    return str?.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
}

export default UserDetails