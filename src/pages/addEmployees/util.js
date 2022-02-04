import { isEmpty } from '../../utilities/functions'

export const dayWeeksInitialState = [
  {
    day_week: 'monday',
    time_start: '',
    time_end: '',
  },
  {
    day_week: 'tuesday',
    time_start: '',
    time_end: '',
  },
  {
    day_week: 'wednesday',
    time_start: '',
    time_end: '',
  },
  {
    day_week: 'thursday',
    time_start: '',
    time_end: '',
  },
  {
    day_week: 'friday',
    time_start: '',
    time_end: '',
  },
  {
    day_week: 'saturday',
    time_start: '',
    time_end: '',
  },
  {
    day_week: 'sunday',
    time_start: '',
    time_end: '',
  },
]

export const validateDayWeeks = (data = []) => {
  const erros = {}

  data.forEach(({ day_week, time_start, time_end }) => {
    const obj = {}

    //if (isEmpty(time_start)) obj.time_start = "*Obrigatório!";
    //if (isEmpty(time_end)) obj.time_end = "*Obrigatório!";

    if (time_start && time_start !== "00:00:00" || time_end && time_end !== "00:00:00")
      if (
        new Date(`2001-02-10 ${time_start}`) >=
        new Date(`2001-02-10 ${time_end}`)
      ) {
        obj.time_start = '*Deve ser menor!'
        obj.time_end = '*Deve ser maior!'
      }

    if (!isEmpty(obj)) erros[day_week] = obj
  })

  return isEmpty(erros) ? false : erros
}

export const getUserProfileValue = (val = false) =>
  val ? 'Equipe de atendimento' : 'Médico Plantonista'

export const getUserProfileValueByString = (val = '') =>
  val === 'Equipe de atendimento' ? true : false

export const getDayWeek = (day, data = []) =>
  data.find((e) => e.day_week === day)
