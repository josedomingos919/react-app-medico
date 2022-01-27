import { Status } from '../../components'
import { formatDate } from '../../utilities/functions'

export const tableData = {
  title: 'Visualizar os dados do Receituário e Exames',
  subTitle: 'Verificar dados do Receituário e Exames',
  fields: [
    {
      label: 'ID',
      name: 'exame_id',
    },
    {
      label: 'Paciente',
      name: 'user_name',
    },
    {
      label: 'Convênio',
      name: 'name_plan',
    },
    {
      label: 'Preferência',
      name: 'preference',
    },
    {
      label: 'Endereço',
      name: 'address_name',
    },
    {
      label: 'Data/Hora',
      name: 'date_start',
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

export const csvInfo = {
  header: [
    'ID',
    'Paciente',
    'Convênio',
    'Preferência',
    'Endereço',
    'Data/Hora',
    'Estado',
  ],
  name: 'solicitacoes',
}

export const formatForCSV = (data = []) =>
  data.map(
    ({
      exame_id,
      user_name,
      preference,
      plan,
      address,
      date_start,
      status_name,
    }) => [
      exame_id,
      user_name,
      plan?.name_plan,
      preference,
      address?.address ?? address,
      date_start ? formatDate(date_start) : '',
      status_name,
    ],
  )
