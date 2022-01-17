import { useState, useEffect } from "react";
import { Row } from "./row";

export const RightSide = () => {
  const initialState = {
    exame_id: "",
    date_input: "",
    equipe_name: "",
    doctor_name: "",
    dose: "",
    medicamento: "",
  };

  const [treatment, setTreatment] = useState([{ ...initialState }]);

  const handleClick = () => {
    setTreatment((prev) => [...prev, initialState]);
  };

  return (
    <div className="col-9">
      {treatment.map(({}, index) => (
        <Row key={index} />
      ))}
      <div className="footer-btn">
        <button
          onClick={() => handleClick()}
          className="btn btn-success btn-add green"
        >
          +
        </button>
      </div>
    </div>
  );
};
