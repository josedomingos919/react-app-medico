export function Loader({ label = "", style = "text-light" }) {
  return (
    <div className={`spinner-border ${style}`} role="status">
      <span className="sr-only">{label}</span>
    </div>
  );
}
