import Image from "next/image"
import Link from "next/link"

export default function Loading() {
    return(
        <div className="flex flex-col w-full h-full bg-white text-black justify-center items-center gap-10">
            <Image priority={true} className="flex w-48 h-48 bg-black rounded-full" src={'/disco.gif'} width={200} height={200}></Image>
            <h1 className="text-lg">로딩 로딩 로딩</h1>
            <h1 className="text-md -mt-5">that's just loading in korean 😅</h1>
            <Link prefetch={true} href={'/'} className="text-fusion-purple underline">Return Home</Link>
        </div>
    )
}