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

    console.log('response=> ', response)

    if (response?.data?.success) {
      setSchedule(
        response?.data?.payload.map(
          ({
            medicamento,
            patient_name,
            equipe_name,
            doctor_name,
            date_input,
            user_rgb,
          }) => ({
            title: `${patient_name}-${equipe_name}-${doctor_name}-${medicamento}`,
            date: date_input,
            backgroundColor: user_rgb,
            borderColor: user_rgb,
          }),
        ) ?? [],
      )
    } else toast.warning('Falha ao carregar as consultas!')
  }, [setSchedule])

  useEffect(() => {
    getSchedule()
  }, [getSchedule])

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
