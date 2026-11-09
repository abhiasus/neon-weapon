import { useEffect, useRef, useState } from "react";
import EffectVideo from "./EffectVideo.jsx";

export default function ChatPanel({ w, level, onClose }) {
  const [msgs, setMsgs] = useState([{ from: "bot", text: `${w.name} assistant online. Say hi to start.` }]);
  const [stage, setStage] = useState("start");
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const end = useRef(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, typing]);

  const say = (m) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((p) => [...p, ...[].concat(m)]); }, 700);
  };

  const send = (raw) => {
    const t = raw.trim();
    if (!t || typing) return;
    setMsgs((p) => [...p, { from: "me", text: t }]);
    setText("");

    const s = t.toLowerCase();
    const hi = /\b(hi+|hello|hey|yo|hola)\b/.test(s);
    const no = /\b(no|nope|nah)\b|not now/.test(s);
    const yes = /\b(yes|yeah|yep|yup|sure|ok|okay|please|show)\b/.test(s);
    const ask = { from: "bot", text: `Hey! 👋 Want to see the effects of the ${w.name}?` };

    if (stage === "start") {
      if (hi) { say(ask); setStage("ask"); }
      else say({ from: "bot", text: "Say “hi” to get started." });
    } else if (no) {
      say({ from: "bot", text: "Okk, no problem! Say “yes” anytime if you change your mind." });
    } else if (yes) {
      say([{ from: "bot", text: `Here are the ${w.name} Level ${level} effects 🔥` }, { from: "bot", video: true }]);
      setStage("done");
    } else if (hi) say(ask);
    else say({ from: "bot", text: "Just say yes or no. Want to see the effects?" });
  };

  return (
    <div className="chat" style={{ "--c": w.color }}>
      <div className="chead">
        <span className="dot" /> <b>{w.name} assistant</b>
        <button className="x" onClick={onClose} aria-label="Close chat">✕</button>
      </div>

      <div className="msgs">
        {msgs.map((m, i) =>
          m.video ? (
            <div className="msg bot wide" key={i}><EffectVideo w={w} level={level} /></div>
          ) : (
            <div className={`msg ${m.from}`} key={i}>{m.text}</div>
          )
        )}
        {typing && <div className="msg bot typing"><i /><i /><i /></div>}
        <div ref={end} />
      </div>

      <div className="chips">
        {["Hi", "Yes", "No"].map((c) => <button key={c} onClick={() => send(c)}>{c}</button>)}
      </div>
      <div className="inputbar">
        <input
          value={text}
          placeholder="Type a message…"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(text)}
          autoFocus
        />
        <button onClick={() => send(text)}>Send</button>
      </div>
    </div>
  );
}
