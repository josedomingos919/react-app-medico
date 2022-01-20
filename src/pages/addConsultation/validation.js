export const validateInput = (inputName, obj) => {
  switch (inputName) {
    case "user_name":
      switch (obj?.type) {
        case "required":
          return "*O campo nome é obrigatório!";
        case "minLength":
          return "*O tamanho mínimo de caractéres é 6";
        case "pattern":
          return "*Nome não pode conter caractéres especiais!";

        default:
          return "";
      }

    case "user_email":
      switch (obj?.type) {
        case "required":
          return "*O campo email é obrigatório!";
        case "pattern":
          return "Email inválido!";
        default:
          return "";
      }

    case "user_cellphone":
      switch (obj?.type) {
        case "required":
          return "*O campo telefone é obrigatório!";
        case "minLength":
          return "*O tamanho mínimo de caractéres é 9!";
        default:
          return "";
      }

    case "user_password":
      switch (obj?.type) {
        case "required":
          return "*O campo password é obrigatório!";
        case "minLength":
          return "*O tamanho mínimo de caractéres é 6!";
        default:
          return "";
      }

    case "user_rgb":
      switch (obj?.type) {
        case "required":
          return "*O campo RGB é obrigatório!";
        case "minLength":
          return "*O tamanho mínimo de caractéres é 7!";
        default:
          return "";
      }

    default:
      return "";
  }
};

export const validation = {
  user_name: { required: true, minLength: 5, pattern: /[a-zA-Z]+[ a-zA-Z]*/ },
  user_email: {
    required: true,
    pattern:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  user_cellphone: {
    required: true,
    minLength: 9,
  },
  user_password: {
    required: true,
    minLength: 6,
  },
  user_rgb: {
    required: true,
    minLength: 6,
  },
};
