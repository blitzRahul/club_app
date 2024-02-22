import SlotsTable from "@/app/components/SlotsTable"

export default function Slots() {
  return (
    <>
      <main className="flex flex-col h-max min-h-screen w-screen bg-fusion-purple p-5 gap-5 items-center justify-start">

        <header className="flex w-full h-max p-5 bg-gray-900 rounded-md justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Update Slots</h1>
          <a href="/dashboard" className="text-white border-b-2 border-transparent duration-75 hover:border-white">Dashboard</a>
        </header>

        <section className="flex flex-col justify-center gap-5 items-center w-full text-sm md:text-[14px] lg:text-lg text-white h-full rounded-lg">
          <div>
            <h1 className="font-bold text-center text-lg">Please add slots for all days!</h1>
            <h1 className="font-bold text-center text-xs">(your ODs will be generated according to this data)</h1>
          </div>
          <SlotsTable />
        </section>

      </main>
    </>
  );
}
