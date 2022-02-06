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
      label: "Token",
      name: "access_token",
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
  optios: {
    add: {
      label: "Novo Paciente",
      path: "/dashboard/patient/add",
    },
    edit: {
      label: "Editar",
    },
    delete: {
      label: "Desabilitar",
      iconName: "fa fa-ban",
    },
  },
};

export const formatData = (data = []) =>
  data?.map((item) => ({
    ...item,
    edit: `patients/add/${item?.user_id}`,
  })) ?? [];

export const csvInfo = {
  header: [
    "ID",
    "Nome",
    "Telefone",
    "E-mail",
    "Token",
    "Endereço",
    "Estado",
    "Perfil",
  ],
  name: "pacientes",
};

export const formatForCSV = (data = []) =>
  data.map(
    ({
      user_id,
      user_name,
      user_mail,
      perfil_name,
      access_token,
      user_status,
      user_cellphone,
    }) => [
      user_id,
      user_name,
      user_mail,
      perfil_name,
      access_token,
      user_status,
      user_cellphone,
    ]
  );
