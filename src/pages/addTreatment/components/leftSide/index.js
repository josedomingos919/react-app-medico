import "../../style.css";

export const LeftSide = () => {
  return (
    <div className="col-3 left-side-menu">
      <div className="mb-5">
        <h2 className="green-text mb-2">Dados da solicitação</h2>
        <p className="dark-text">
          Nome: Jose domingos
          <br />
          Email: jose@gmail.com
          <br />
          Telefone: (11) 3783-47384
        </p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Convênio</h2>
        <p className="dark-text">Plano: Particular</p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Exames e Reituários</h2>
        <p className="dark-text">
          Exames
          <p className="light-green">arquivo.jpg</p>
          Receituário
          <p className="light-green">arquivo.jpg</p>
        </p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Endereço informádio</h2>
        <p className="dark-text">Rua 5, avenida 21 de jáneiro luanda</p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Informações Adicionais</h2>
        <p className="dark-text">Périodo de preferencia: Manhã </p>
        <p className="dark-text">Data do priméiro período: 30/01/2021</p>
      </div>
      <div className="mb-5">
        <button
          style={{
            border: "none",
            background: "#dc4245",
          }}
          type="button"
          className="btn btn-danger"
        >
          Recusar
        </button>
      </div>
    </div>
  );
};
