export const tableData = {
  title: 'Listas de medicação',
  subTitle: 'Verificar todas as medicações',
  fields: [
    {
      label: 'ID',
      name: 'id',
    },
    {
      label: 'Medicação',
      name: 'medicamento',
    },
  ],
  optios: {
    edit: {
      label: 'Editar',
    },
    add: {
      label: 'Nava Medicação',
      path: '/dashboard/medication/add',
    },
    delete: {
      label: 'Eliminar',
    },
  },
}

export const csvInfo = {
  header: ['ID', 'Medicação'],
  name: 'medicação',
}

export const formatData = (data = []) =>
  data?.map((item) => ({
    ...item,
    edit: `medication/add/${item?.id}`,
  })) ?? []

export const formatForCSV = (data = []) =>
  data.map(({ id, medicamento }) => [id, medicamento])
