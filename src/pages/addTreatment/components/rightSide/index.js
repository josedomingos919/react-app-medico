import { useApp } from "../../../../context/app";
import { Row } from "./row";

export const RightSide = () => {
  const { treatment, setTreatment } = useApp();

  const handleClick = (e) => {
    e.preventDefault();
    setTreatment((prev) => [...prev, {}]);
  };

  return (
    <div className="col-9">
      {treatment.map((_, index) => (
        <Row key={index} index={index} />
      ))}
      <div className="footer-btn">
        <button
          onClick={(e) => handleClick(e)}
          className="btn btn-success btn-add green"
        >
          +
        </button>
      </div>
    </div>
  );
};
