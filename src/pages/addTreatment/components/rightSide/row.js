import Select from "react-select";

export const Row = () => {
  return (
    <div className="col-12 mb-5">
      <div className="row div row">
        <div className="col-4 mb-3 ">
          <h2 className="green-text mb-2">Horários</h2>
          <input className="registerInput" type="datetime-local" />
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Equipe</h2>
          <Select
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Médico Platonista</h2>
          <input className="registerInput" type="text" />
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Medicação</h2>
          <Select
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Dose</h2>
          <input className="registerInput" type="text" />
        </div>
      </div>
    </div>
  );
};
