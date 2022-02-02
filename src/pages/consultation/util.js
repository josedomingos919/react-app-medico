import { Status } from '../../components'
import { formatDate } from '../../utilities/functions'

export const initialFormData = {
  date_input: '',
  equipe_id: {},
  doctor_id: {},
  medicine_id: {},
  status_id: {},
}

export const tableData = {
  title: 'Consulta em lista',
  subTitle: 'Verificar todas as consultas',
  fields: [
    {
      label: 'ID',
      name: 'exame_id',
    },
    {
      label: 'Paciente',
      name: 'patient_name',
    },
    {
      label: 'Equipe',
      name: 'equipe_name',
    },
    {
      label: 'Data/Hora',
      name: 'date_input',
    },
    {
      label: 'Medicamento',
      name: 'medicamento',
    },
    {
      label: 'Andamento',
      name: 'status_name',
    },
  ],
  optios: {
    edit: {
      label: 'Editar',
    },
  },
}

export const formatData = (data = []) => {
  return data.map((item) => ({
    ...item,
    status_name_clone: item?.status_name,
    status_name: (
      <Status backgroundColor={item?.status_rgb} label={item?.status_name} />
    ),
    name_plan: item?.plan?.name_plan,
    address_name: item?.address?.address ?? item.address,
    date_input: item?.date_input
      ? new Date(item?.date_input).toLocaleString()
      : '',
  }))
}

export const csvInfo = {
  header: tableData.fields.map(({ label }) => label),
  name: 'consultas',
}

export const formatForCSV = (data = []) =>
  data.map(
    ({
      exame_id,
      patient_name,
      equipe_name,
      date_input,
      medicamento,
      status_name,
    }) => [
      exame_id,
      patient_name,
      equipe_name,
      date_input ? formatDate(date_input) : '',
      medicamento,
      status_name,
    ],
  )
