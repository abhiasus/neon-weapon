import { useState } from "react";
import GunImage from "./GunImage.jsx";
import Toast from "./Toast.jsx";

export default function WeaponCard({ w, level, open, anyOpen, onOpen, onClose, onLevel, onInspect, onEffects }) {
  const [toast, setToast] = useState(false);
  const stop = (fn) => (e) => { e.stopPropagation(); fn(e); };

  const equip = () => {
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  return (
    <div
      className={`card ${open ? "open" : ""} ${anyOpen && !open ? "dim" : ""}`}
      style={{ "--c": w.color }}
      tabIndex={0}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onClick={onOpen}
    >
      <div className="pic"><GunImage id={w.id} level={level} name={w.name} /></div>
      <h3>{w.name}</h3>
      <div className="type">{w.type} · Lv {level}</div>

      <div className="more">
        <div className="stats">
          {Object.entries(w.stats).map(([label, v]) => (
            <div className="stat" key={label}>
              {label}
              <div className="bar"><i style={{ width: open ? `${v[level - 1]}%` : 0 }} /></div>
              <b>{v[level - 1]}</b>
            </div>
          ))}
        </div>

        <div className="lv">
          {[1, 2, 3].map((l) => (
            <button key={l} className={level === l ? "on" : ""} onClick={stop(() => onLevel(l))}>Lv {l}</button>
          ))}
        </div>

        <div className="btns">
          <button className="b1" onClick={stop(equip)}>Equip</button>
          <button className="b2" onClick={stop(onInspect)}>Inspect</button>
        </div>
        <button className="fx" onClick={stop(onEffects)}>See effects</button>
      </div>

      <Toast show={toast} name={w.name} />
    </div>
  );
}
