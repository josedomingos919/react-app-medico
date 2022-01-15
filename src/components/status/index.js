export const Status = ({
  backgroundColor = "#a3a6b4",
  label = "",
  color = "white",
  fontSize = 12,
}) => (
  <span
    style={{
      backgroundColor,
      fontSize,
      color,
    }}
    className="badge p-2 "
  >
    {label}
  </span>
);
