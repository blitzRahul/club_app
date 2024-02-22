import GoogleSignInButton from '../components/GoogleSignInButton'

const SignInPage = () => {
    return (
        <section className='flex flex-col h-screen w-screen justify-center items-center p-5 gap-5 bg-black'>
            <div className='flex flex-col h-max w-11/12 md:w-max bg-purple-500 text-white p-5 gap-10 rounded-lg items-center justify-center text-center'>
                <img src={'/fusion-circle-black.avif'} className='rounded-full w-24 h-24 hover:rotate-45 duration-200' />
                <h1 className='text-center text-2xl font-medium'>The Fusion Club</h1>
                <div className='flex flex-col gap-1'>
                    <h4>We would like to verify your domain</h4>
                    <code className='bg-gray-300 text-black p-1 rounded-md'>@vitbhopal.ac.in</code>
                </div>
                <GoogleSignInButton />
                <h6 className='text-xs w-11/12 lg:w-10/12 text-center italic'>We only access non-sensitive data like your name, email and public profile image.</h6>
            </div>
            <a href={'/'} className="p-2 px-3 bg-gray-100 mt-5 hover:shadow-gray-700 shadow-md hover:scale-[1.01] duration-100 rounded-full text-red-500 flex justify-center items-center w-max h-max text-xs">💔&nbsp;&nbsp;Decline and Return</a>
        </section>
    )
}

export default SignInPage