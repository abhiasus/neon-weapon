/* ---------- assets: drop files in, no code change needed ---------- */
// images:  src/assets/guns/<id>-<level>.(png|jpg|jpeg|webp|avif)
// videos:  src/assets/videos/<id>-<level>.(mp4|webm|mov)  or  <id>.mp4
const images = import.meta.glob("../assets/guns/*.{png,jpg,jpeg,webp,avif}", { eager: true, import: "default" });
const videos = import.meta.glob("../assets/videos/*.{mp4,webm,mov}", { eager: true, import: "default" });

const lookup = (files, id, suffix) => {
  const key = Object.keys(files).find((k) => new RegExp(`/${id}${suffix}\\.[a-z0-9]+$`, "i").test(k));
  return key ? files[key] : undefined;
};

export const getImage = (id, level) =>
  lookup(images, id, `-${level}`) || lookup(images, id, "-1") || lookup(images, id, "-2") || lookup(images, id, "-3");

export const getVideo = (id, level) => lookup(videos, id, `-${level}`) || lookup(videos, id, "");
