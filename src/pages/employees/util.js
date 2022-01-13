export const tableData = {
  title: "Todos os colaboradores cadastrados",
  fields: [
    {
      label: "ID",
      name: "user_id",
    },
    {
      label: "Nome",
      name: "user_name",
    },
    {
      label: "E-mail",
      name: "user_mail",
    },
    {
      label: "Telefone",
      name: "user_cellphone",
    },
    {
      label: "Perfil",
      name: "perfil_name",
    },
    {
      label: "Tipo",
      name: "user_status",
    },
  ],
  data: [
    {
      name: "José Domingos",
      email: "example@terra.com.br",
      phone: "(11) 99922-3343",
      type: "Enfermeiro",
    },
    {
      name: "Genilson Domingos",
      email: "example@terra.com.br",
      phone: "(11) 99922-3343",
      type: "Médico Plantonista",
    },
    {
      name: "Kwenda Domingos",
      email: "example@terra.com.br",
      phone: "(11) 99922-3343",
      type: "Médico Plantonista",
    },
  ],
  optios: {
    edit: {
      label: "Editar",
    },
    add: {
      label: "Novo colaborador",
      path: "/dashboard/colaborators/add",
    },
    delete: {
      label: "Desativar",
      iconName: "fa fa-ban",
    },
  },
};

export const formatData = (data = []) =>
  data?.map((item) => ({
    ...item,
    edit: `colaborators/add/${item?.user_id}`,
  })) ?? [];
