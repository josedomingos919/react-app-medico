export const tableData = {
  title: "Pacientes",
  subTitle: "Todos os pacientes cadastrados",
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
      label: "Telefone",
      name: "user_cellphone",
    },
    {
      label: "E-mail",
      name: "user_mail",
    },
    {
      label: "Estado",
      name: "user_status",
    },
    {
      label: "Perfil",
      name: "perfil_name",
    },
  ],
  data: [
    {
      name: "José Domingos",
      email: "example@terra.com.br",
      phone: "(11) 99922-3343",
    },
    {
      name: "Genilson Domingos",
      email: "example@terra.com.br",
      phone: "(11) 99922-3343",
    },
    {
      name: "Kwenda Domingos",
      email: "example@terra.com.br",
      phone: "(11) 99922-3343",
    },
  ],
  optios: {
    add: {
      label: "Novo Paciente",
    },
    edit: {
      label: "Editar",
    },
    delete: {
      label: "Eliminar",
    },
  },
};

export const formatData = (data = []) =>
  data?.map((item) => ({
    ...item,
    edit: `patients/add/${item?.id}`,
  })) ?? [];
