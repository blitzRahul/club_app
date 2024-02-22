import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex text-center flex-col h-screen w-screen bg-black text-white items-center justify-center gap-5">
      <Image
        src={"/yes.png"}
        height={100}
        width={100}
        alt={"check mark"}
        className="mb-10"
      />
      <h1>We have received your details!</h1>
      <h1>📨 You will receive a verification mail in 24 hours!</h1>
      <Link
        href={"/"}
        className="pb-1 px-1 border-b-2 border-fusion-purple mt-5 text-fusion-purple"
      >
        Return Home
      </Link>
    </main>
  );
}
