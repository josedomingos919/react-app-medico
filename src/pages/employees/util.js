export const tableData = {
  title: 'Todos os colaboradores cadastrados',
  fields: [
    {
      label: 'ID',
      name: 'user_id',
    },
    {
      label: 'Nome',
      name: 'user_name',
    },
    {
      label: 'E-mail',
      name: 'user_mail',
    },
    {
      label: 'Telefone',
      name: 'user_cellphone',
    },
    {
      label: 'Perfil',
      name: 'perfil_name',
    },
    {
      label: 'Tipo',
      name: 'user_status',
    },
  ],
  optios: {
    edit: {
      label: 'Editar',
    },
    add: {
      label: 'Novo colaborador',
      path: '/dashboard/colaborators/add',
    },
    delete: {
      label: 'Desabilitar',
      iconName: 'fa fa-ban',
    },
  },
}

export const formatData = (data = []) =>
  data?.map((item) => ({
    ...item,
    edit: `colaborators/add/${item?.user_id}`,
  })) ?? []

export const csvInfo = {
  header: tableData.fields.map(({ label }) => label),
  name: 'colaboradores',
}

export const formatForCSV = (data = []) =>
  data.map(
    ({
      user_id,
      user_name,
      user_mail,
      user_cellphone,
      perfil_name,
      user_status,
    }) => [
      user_id,
      user_name,
      user_mail,
      user_cellphone,
      perfil_name,
      user_status,
    ],
  )
