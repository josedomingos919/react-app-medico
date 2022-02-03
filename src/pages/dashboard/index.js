import React, { useCallback, useEffect, useState } from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

/*
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
*/


import { services } from '../../service'
import { AppContent } from '../../components'
import Select from 'react-select'

import './style.css'
import { toast } from 'react-toastify'
import { calendarTypeData } from './util'
import { isEmpty } from '../../utilities/functions'

export function Dashboard() {
  const [schedule, setSchedule] = useState([])
  const [calendarType, setCalendarType] = useState(calendarTypeData[0])

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
            <div>Todas as consultas</div>
            <div className="div-calendar-options">
              <Select
                value={calendarType}
                onChange={(val) => setCalendarType(val)}
                isDisabled={isEmpty(calendarTypeData)}
                options={calendarTypeData}
              />
            </div>
          </div>

          <FullCalendar 
            key={calendarType?.value}
            buttonText={{
              today: 'Hoje',
            }} 
            locale="pt-br"
            plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
            initialView={ calendarType?.value }
            events={schedule}
          />   
        </div>
      </div>
    </AppContent>
  )
}
 
  