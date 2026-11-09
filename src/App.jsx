import { useEffect, useState } from "react";
import { weapons } from "./data/weapons.js";
import Background from "./components/Background.jsx";
import Header from "./components/Header.jsx";
import WeaponCard from "./components/WeaponCard.jsx";
import InspectPanel from "./components/InspectPanel.jsx";
import ChatPanel from "./components/ChatPanel.jsx";

export default function App() {
  const [openId, setOpenId] = useState(null);
  const [levels, setLevels] = useState({ m416: 1, scar: 1, ak117: 1 });
  const [inspect, setInspect] = useState(null);
  const [chat, setChat] = useState(null);

  const find = (id) => weapons.find((x) => x.id === id);
  const setLevel = (id, l) => setLevels((p) => ({ ...p, [id]: l }));
  const closeAll = () => { setInspect(null); setChat(null); };

  useEffect(() => {
    const k = (e) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const iw = find(inspect);
  const cw = find(chat);

  return (
    <>
      <Background />
      <main className="page">
        <Header />
        <div className="row">
          {weapons.map((g) => (
            <WeaponCard
              key={g.id}
              w={g}
              level={levels[g.id]}
              open={openId === g.id}
              anyOpen={openId !== null}
              onOpen={() => setOpenId(g.id)}
              onClose={() => setOpenId(null)}
              onLevel={(l) => setLevel(g.id, l)}
              onInspect={() => setInspect(g.id)}
              onEffects={() => setChat(g.id)}
            />
          ))}
        </div>
      </main>

      <div className={`modal ${iw ? "show" : ""}`} onClick={(e) => e.target === e.currentTarget && closeAll()}>
        {iw && <InspectPanel w={iw} level={levels[iw.id]} onLevel={(l) => setLevel(iw.id, l)} onClose={closeAll} />}
      </div>

      <div className={`modal ${cw ? "show" : ""}`} onClick={(e) => e.target === e.currentTarget && closeAll()}>
        {cw && <ChatPanel key={cw.id} w={cw} level={levels[cw.id]} onClose={closeAll} />}
      </div>
    </>
  );
}
