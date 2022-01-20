import { Status } from '../../components'
import { formatDate } from '../../utilities/functions'

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
      label: 'Estado',
      name: 'status_name',
    },
  ],
  optios: {
    edit: {
      label: 'Editar',
    },
    add: {
      label: 'Nova Consulta',
      path: '/dashboard/consultation/add',
    },
  },
}

export const formatData = (data = []) => {
  return data.map((item) => ({
    ...item,
    edit: `/dashboard/treatment/add/${item?.exame_id}`,
    status_name: (
      <Status backgroundColor={item?.status_rgb} label={item?.status_name} />
    ),
    name_plan: item?.plan?.name_plan,
    address_name: item?.address?.address ?? item.address,
    date_start: formatDate(item?.date_start),
  }))
}
