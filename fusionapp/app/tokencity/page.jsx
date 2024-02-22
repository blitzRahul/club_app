export default function Page() {
    return (
        <main className="flex flex-col h-max w-full bg-white text-black items-center justify-start p-8 gap-8">
            <section className="flex flex-row w-full h-max items-center justify-around gap-5">
                <img src="/vitb.png" alt="fusion logo" className="w-48" />
                <img src="/advitya.png" alt="vitb logo" className="w-48" />
                <img src="/fusionblack.png" alt="vitb logo" className="w-64" />
            </section>
            <section className="flex flex-row flex-wrap justify-center items-center gap-8">
                <img src="/casino.avif" alt="casino" className="w-80 h-80 rounded-lg" />
                <div className="flex flex-col w-full max-w-lg items-center justify-center">
                    <h1 className="text-4xl font-bold text-center p-5">♥️♦️ Token City ♣️♠️</h1>
                    <p className="text-lg text-center p-3">Step right up to Token City, where the fun never stops! Get ready to spin the wheel of fortune or test your speed with slapjack! To get in on the action, just grab some Fusion Tokens, choose your game, and let the good times roll! And if you're a lucky duck and win, you'll get double the tokens to keep the party going! With a stash of tokens, you can exchange them for some pretty epic prizes! So, come on down to Token City and let the games begin!</p>
                </div>
            </section>
            <section className="flex flex-col w-full max-w-lg items-center justify-center">
                <h2 className="text-2xl font-bold text-center p-5">Event Details</h2>
                <div className="grid grid-cols-2 gap-4 text-lg">
                    <div className="bg-purple-500 text-white rounded-full p-2 text-center px-3">
                        <p>Date: 22 February, 2024</p>
                    </div>
                    <div className="bg-purple-500 text-white rounded-full p-2 text-center px-3">
                        <p>Time: 11 AM to 4 PM</p>
                    </div>
                    <div className="bg-purple-500 text-white rounded-full p-2 text-center px-3">
                        <p>Location: AB-213</p>
                    </div>
                    <div className="bg-purple-500 text-white rounded-full p-2 text-center px-3">
                        <p>Registration Fee: ₹350</p>
                    </div>
                </div>
                <p className="mt-3 italic">*registration fee includes tokens to play games at the event</p>
            </section>
            <section className="flex flex-col w-full max-w-lg items-center justify-center">
                <h2 className="text-2xl font-bold text-center p-5">Registration</h2>
                <div className="flex flex-col md:flex-row gap-8 text-xl">
                    <a href="/tokencity/external" className="flex flex-col font-bold bg-purple-500 w-72 h-24 rounded-lg p-3 text-center items-center justify-center text-white hover:bg-purple-600 hover:shadow-lg">
                        <p>External participants click here</p>
                    </a>
                    <a href="/tokencity/internal" className="flex flex-col font-bold bg-purple-500 w-72 h-24 rounded-lg p-3 text-center items-center justify-center text-white hover:bg-purple-600 hover:shadow-lg">
                        <p>Students of VIT Bhopal University click here</p>
                    </a>
                </div>
            </section>
        </main>
    );
}
