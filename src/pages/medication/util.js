export const tableData = {
  fields: [
    {
      label: "ID",
      name: "id",
    },
    {
      label: "Medicação",
      name: "medicamento",
    },
  ],
  optios: {
    edit: {
      label: "Editar",
    },
    add: {
      label: "Nava Medicação",
      path: "/dashboard/medication/add",
    },
    delete: {
      label: "Eliminar",
    },
  },
};

export const getEditUrl = (id) => `medication/add/${id}`;
