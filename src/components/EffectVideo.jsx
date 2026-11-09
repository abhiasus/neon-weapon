import { getVideo } from "../data/assets.js";
import GunImage from "./GunImage.jsx";

export default function EffectVideo({ w, level }) {
  const src = getVideo(w.id, level);
  if (src) return <video className="vid" src={src} autoPlay muted loop controls playsInline />;
  return (
    <div className="vid fake">
      <div className="scan" />
      <GunImage id={w.id} level={level} name={w.name} />
      <small>Add {w.id}-{level}.mp4 to src/assets/videos</small>
    </div>
  );
}
