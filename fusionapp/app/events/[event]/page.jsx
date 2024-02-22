"use client";

import { useState, useEffect } from "react";
import { eventlist } from "@/app/components/eventlist";
import Image from "next/image";

export default function Page({ params }) {
  const [images, setImages] = useState([]);
  const [event, setEvent] = useState({});
  useEffect(() => {
    const theEvent = eventlist.filter((event) => event.id === params.event)[0];
    setEvent(theEvent);
    const numberOfLinks = theEvent.albumSize;
    const links = [];
    for (let i = 1; i <= numberOfLinks; i++) {
      links.push(
        `https://thefusionclub.blr1.cdn.digitaloceanspaces.com/${params.event}/${i}.jpg`
      );
    }
    setImages(links);
  }, [params.event]);

  return (
    <main className="flex flex-col w-full h-max bg-white text-black self-center p-5 justify-center items-center gap-4">
        <header className="flex flex-row w-full h-max p-5 bg-gray-900 rounded-md justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
            {event.name}
          </h1>
          <a href="/events" className="text-white border-b-2 border-transparent duration-75 hover:border-white">Events</a>
        </header>
      <div className="flex flex-col md:flex-row flex-wrap w-full h-max p-4 gap-4 justify-center items-start">
        {images.map((link, index) => (
              <Image
                src={link}
                alt={params.event}
                width={500}
                height={500}
                className="w-full md:w-2/5 rounded-md duration-300 hover:scale-[1.02] hover:shadow-gray-600 shadow-lg border-[1px] border-gray-300"
              />
        ))}
      </div>
    </main>
  );
}
