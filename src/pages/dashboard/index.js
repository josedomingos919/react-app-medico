import React, { useCallback, useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";

/*
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
*/

import { services } from "../../service";
import { AppContent } from "../../components";
import Select from "react-select";

import "./style.css";
import { toast } from "react-toastify";
import { calendarTypeData } from "./util";
import { isEmpty } from "../../utilities/functions";

export function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calendarType, setCalendarType] = useState(calendarTypeData[0]);

  const getSchedule = useCallback(async () => {
    const response = await services.exame.schedule({
      date: "",
    });

    console.log("response=> ", response.data);

    if (response?.data?.success) {
      const loadedSchedule =
        response?.data?.payload.map(
          ({
            medicamento,
            patient_name,
            equipe_name,
            doctor_name,
            schedule_event,
            user_rgb,
          }) => ({
            title: `${patient_name}-${equipe_name}-${doctor_name}-${medicamento}`,
            date: schedule_event,
            backgroundColor: user_rgb,
            borderColor: user_rgb,
          })
        ) ?? [];

      setSchedule(loadedSchedule);

      console.log(loadedSchedule);
      setLoading(false);
    } else toast.warning("Falha ao carregar as consultas!");
  }, []);

  useEffect(() => {
    getSchedule();
  }, [getSchedule]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

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

          {schedule.length > 0 && (
            <FullCalendar
              key={calendarType?.value}
              buttonText={{
                today: "Hoje",
              }}
              allDayText="Dia todo"
              locale="pt-Br"
              plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
              initialView={calendarType?.value}
              events={schedule}
            />
          )}
        </div>
      </div>
    </AppContent>
  );
}
