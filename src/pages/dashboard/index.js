import React, { useCallback, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { services } from '../../service'
import { AppContent } from '../../components'

import './style.css'
import { toast } from 'react-toastify'

export function Dashboard() {
  const [schedule, setSchedule] = useState([])

  const getSchedule = useCallback(async () => {
    const response = await services.exame.schedule({
      date: '',
    })

    if (response?.data?.success) {
      setSchedule(
        response?.data?.payload.map(
          ({ medicamento, date_input, status_rgb }) => ({
            title: medicamento,
            date: date_input,
            backgroundColor: status_rgb,
            borderColor: status_rgb,
          }),
        ) ?? [],
      )
    } else toast.warning('Falha ao carregar as consultas!')
  }, [setSchedule])

  useEffect(() => {
    getSchedule()
  }, [getSchedule])

  console.log('teste=> ', 2)

  return (
    <AppContent>
      <div className="calanderChart">
        <div className="chartParent">
          <div className="mainText title-header-consultation">
            Todas as consultas
          </div>
          <FullCalendar
            buttonText={{
              today: 'Hoje',
            }}
            locale="pt-br"
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={schedule}
          />
        </div>
      </div>
    </AppContent>
  )
}
