export const tableData = {
  fields: [
    {
      label: "Nome",
      name: "name",
    },
    {
      label: "E-mail",
      name: "email",
    },
    {
      label: "Telefone",
      name: "phone",
    },
    {
      label: "Tipo",
      name: "type",
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
  },
};
