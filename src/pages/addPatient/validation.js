export const validation = {
  name: {
    required: {
      value: true,
      message: "*Campo nome é obrigatório!",
    },
    minLength: {
      value: 6,
      message: "*Pelomenos 6 caractéres!",
    },
    pattern: {
      value: /[a-zA-Z]+[ a-zA-Z]*/,
      message: "Nome não pode conter caractéres especiais!",
    },
  },
  email: {
    required: {
      value: true,
      message: "*Campo email é obrigatório!",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "*Email inválido!",
    },
  },
  cellphone: {
    required: {
      value: true,
      message: "*Campo telefone é obrigatório!",
    },
    minLength: {
      value: 9,
      message: "*Pelomenos 9 caractéres!",
    },
  },
  password: {
    required: {
      value: true,
      message: "*Campo é obrigatório!",
    },
    minLength: {
      value: 6,
      message: "*Pelomenos 6 caractéres!",
    },
  },
};
