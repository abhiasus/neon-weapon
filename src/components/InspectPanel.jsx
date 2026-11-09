import GunImage from "./GunImage.jsx";

export default function InspectPanel({ w, level, onLevel, onClose }) {
  return (
    <div className="sheet" style={{ "--c": w.color }}>
      <div className="big"><GunImage id={w.id} level={level} name={w.name} /></div>
      <h2>{w.name}</h2>
      <p>{w.info}</p>
      <div className="tiers">
        {[1, 2, 3].map((l) => (
          <button key={l} className={level === l ? "on" : ""} onClick={() => onLevel(l)}>Level {l}</button>
        ))}
      </div>
      <button className="close" onClick={onClose}>Close</button>
    </div>
  );
}
