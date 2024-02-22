import { eventlist } from "../components/eventlist";
const events = eventlist.reverse();

export default function Page() {
  return (
    <>
      <main class="flex flex-col w-full h-max bg-white text-black max-w-[1200px] self-center p-5 justify-center items-center mx-auto gap-4">
        <header class="flex flex-row w-full h-max p-5 bg-gray-900 rounded-md justify-between items-center">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-violet-500 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
            Our Events
          </h1>
          <a
            href="/"
            className="text-white border-b-2 border-transparent duration-75 hover:border-white"
          >
            Home
          </a>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full bg-fuchsia-100 p-8 gap-8 rounded-md">
          {events.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
        </div>
      </main>
    </>
  );
}

const EventCard = ({ event }) => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-row gap-2 justify-between items-center w-full">
        <img
          src={event.thumbnail}
          alt={event.name}
          className="w-full rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between items-start w-full">
        <h1 className="text-2xl font-bold leading-3">
          {event.name} -{" "}
          <span className="text-xl font-bold">{event.phrase}</span>
        </h1>
        <p className="text-base font-bold">{event.date}</p>
      </div>
      <div className="flex flex-row gap-2 justify-between items-center w-full">
        <p className="text-base">{event.description}</p>
      </div>
      <p className="text-base font-bold italic">
        {event.footfall} participants
      </p>
      <a
        className="flex flex-row w-max bg-fuchsia-400 text-white px-3 p-1 rounded-full hover:bg-fuchsia-500"
        href={`/events/${event.id}`}
      >
        View Album
      </a>
    </div>
  );
};
