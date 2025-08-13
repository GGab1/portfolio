'use client'

import { useState } from 'react'
import { format, getDaysInMonth, startOfMonth } from 'date-fns'
import { fr } from 'date-fns/locale'

type Evenement = {
  id: number
  titre: string
  date: string
  note: string
}

export default function Calendrier({ evenements }: { evenements: Evenement[] }) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const filteredEvents = evenements.filter(ev => {
    const evDate = new Date(ev.date)
    return evDate.getMonth() === currentMonth && evDate.getFullYear() === currentYear
  })

  const daysInMonth = getDaysInMonth(currentDate)
  const startDay = startOfMonth(currentDate).getDay()

  const dayEvents = filteredEvents.filter(ev =>
    format(new Date(ev.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  )

  const eventsByDay = filteredEvents.reduce((acc, ev) => {
    const key = format(new Date(ev.date), 'd')
    acc[key] = acc[key] ? [...acc[key], ev] : [ev]
    return acc
  }, {} as Record<string, Evenement[]>)

  return (
    <div className="flex flex-1 rounded-3xl backdrop-blur-md shadow-lg text-white overflow-hidden min-h-[300px]">
      {/* Détail jour sélectionné à gauche */}
      <div className="w-[40%] p-5 flex flex-col justify-between bg-black/50 border-r border-white/10">
        <div className='pt-9'>
          <div className="text-5xl font-bold leading-none">{format(selectedDate, 'd')}</div>
          <div className="text-xs text-white/70 capitalize">{format(selectedDate, 'EEEE LLLL yyyy', { locale: fr })}</div>
        </div>

        <div className="mt-4 space-y-2 text-sm overflow-y-auto">
          {dayEvents.length === 0 && <div className="text-white/50 text-sm">Aucun événement</div>}
          {dayEvents.map(ev => (
            <div key={ev.id} className="p-2 bg-white/10 rounded-xl">
              <div className="font-medium text-white">{ev.titre}</div>
              <div className="text-xs text-white/60 mt-1">{ev.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini calendrier à droite */}
      <div className="w-[60%] p-5">
        <div className="text-center font-semibold text-lg mb-3">{format(currentDate, 'LLLL yyyy', { locale: fr })}</div>
        <div className="grid grid-cols-7 text-xs text-white/50 mb-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
            <div key={i} className="flex justify-center items-center">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px text-sm">

          {Array(startDay === 0 ? 6 : startDay - 1).fill(null).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const hasEvent = !!eventsByDay[day.toString()]
            const isToday = currentDate.getDate() === day
            const isSelected = selectedDate.getDate() === day

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                className={`relative w-full h-8 rounded-full flex items-center justify-center text-sm transition
                  ${isSelected ? 'bg-white text-black font-bold border' : ''}
                  ${!isSelected && isToday ? 'bg-white/20 text-white border border-white/30' : ''}
                  ${!isSelected && !isToday ? 'hover:bg-white/10 text-white/80' : ''}
                `}
              >
                {day} 
                {hasEvent && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
