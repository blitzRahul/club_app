'use client'
import { useState, useEffect } from "react";
import { connectToUserSocket } from "./socketHandler";

export default function SlotsTable() {

  const [slots, setSlots] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [userSocket, setUserSocket] = useState(null)

  useEffect(() => {
    initializeUserSocket()
  }, [userSocket])

  const initializeUserSocket = async () => {
    try {
      const token = await fetch('/api/protected/socketToken').then(res => res.json()).then(data => data.token)
      const userSocket = connectToUserSocket(token)
      userSocket.on('connect', () => {
        setUserSocket(userSocket)
        console.log('Connected to user socket')
      })
      userSocket.emit('get-slots')
      userSocket.on('disconnect', (reason) => {
        if (reason === "io server disconnect") socket.connect();
      })
      userSocket.on('get-slots-success', (slots) => {
        setSlots(slots)
        setSaving(false)
      })
      userSocket.on('update-slots-success', () => {
        setTimeout(() => {
          setSaving(false)
          setSuccess(true)
        }, 200);
      })
      userSocket.on('update-slots-failure', () => {
        setTimeout(() => {
          setSaving(false)
          setError(true)
        }, 200);
      })
    }
    catch (err) {
      console.log('user socket error')
    }
  }

  function handleSlotClick(slot) {
    setSaving(true)
    let modifiedSlots = [...slots]
    if (slots.indexOf(slot) > -1) {
      modifiedSlots = (slots.filter((s) => s !== slot))
    }
    else {
      modifiedSlots = ([...slots, slot])
    }
    if(!userSocket?.connected)
      userSocket?.connect()
    userSocket.emit('update-slots', modifiedSlots)
    setSlots(modifiedSlots)
  }

  const manualSave = () => {
    setSaving(true)
    if(!userSocket?.connected)
      userSocket?.connect()
    userSocket.emit('update-slots', slots)
  }

  return (
    <div className='flex flex-col h-[80vh] w-full items-center justify-center gap-5'>
      <table className='w-[90vw] h-4/5'>
        <tbody className={saving ? 'animate-pulse' : 'opacity-100'}>
          {
            timetableData.map((cells, rowNo) => {
              return (<tr key={("" + rowNo)}>
                {
                  cells.map((cellData, colNo) => {
                    if (rowNo < 1 || colNo < 1) {
                      return (
                        <th className='border-[1px] border-black border-solid heading -rotate-90 md:rotate-0' key={("" + colNo) + ("" + rowNo)}>{cellData}</th>
                      );
                    }
                    else {
                      return (
                        <td className={`border-[1px] border-black border-solid text-center cell hover:bg-fuchsia-600 hover:font-bold ${slots.indexOf(cellData) > -1 ? 'bg-fuchsia-500' : ''}`} key={cellData} onClick={() => handleSlotClick(cellData)} >{cellData}</td>
                      );
                    }
                  })
                }
              </tr>);
            })}
        </tbody>
      </table>
      <p className={`flex flex-row rounded-full text-lg p-2 px-3 h-max w-max items-center text-center justify-center`}>
        {
          saving ? 'loading...' : (error ? 'save error - your changes have been saved locally' : (success ? 'Saved!' : 'changes will autosave'))
        }
      </p>
      {error && <button onClick={manualSave} className='pb-[1px] px-[1px] text-white border-b-2 border-white text-sm'>Manual Save</button>}
    </div>
  );
};

const timetableData =
  [
    ["🪩", "08:30", "10:05", "11:40", "13:15", "14:50", "16:25", "18:00"],
    ["MON", "A11", "B11", "C11", "A21", "A14", "B21", "C21"],
    ["TUE", "D11", "E11", "F11", "D21", "E14", "E21", "F21"],
    ["WED", "A12", "B12", "C12", "A22", "B14", "B22", "A24"],
    ["THU", "D12", "E12", "F12", "D22", "F14", "E22", "F22"],
    ["FRI", "A13", "B13", "C13", "A23", "C14", "B23", "B24"],
    ["SAT", "D13", "E13", "F13", "D23", "D14", "D24", "E23"],
  ];