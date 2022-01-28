import { useApp } from '../../../../context/app'
import { Row } from './row'

export const RightSide = () => {
  const { treatment, setTreatment } = useApp()

  const handleClick = (e) => {
    e.preventDefault()
    setTreatment((prev) => [...prev, {}])
  }

  const handleRemove = () =>
    setTreatment((prev) =>
      prev.length >= 2
        ? prev.filter((_, index) => index < prev.length - 1)
        : prev,
    )

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

        {treatment.length > 1 && (
          <button onClick={handleRemove} className="ml-3 btn btn-danger danger">
            -
          </button>
        )}
      </div>
    </div>
  )
}
