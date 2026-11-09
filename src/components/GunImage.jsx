import { getImage } from "../data/assets.js";

export default function GunImage({ id, level, name }) {
  const src = getImage(id, level);
  if (!src) return <span className="noimg">Add {id}-{level}.png</span>;
  return <img key={src} src={src} alt={`${name} level ${level}`} draggable="false" />;
}
