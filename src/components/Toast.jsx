export default function Toast({ show, name }) {
  return (
    <div className={`toast ${show ? "show" : ""}`}><span>{name}</span> equipped</div>
  );
}
