// Each gun has 3 level images in /public/guns  ->  name-1.png, name-2.png, name-3.png
// stats are per level: [Lv1, Lv2, Lv3]
export const weapons = [
  {
    id: "m416", name: "M416", color: "#1ff2ff", type: "Assault rifle",
    info: "Stable all-rounder with low recoil. Great at mid range.",
    stats: {
      Damage:   [41, 46, 52],
      Accuracy: [70, 78, 86],
      Reload:   [60, 68, 76],
      Range:    [65, 72, 80],
    },
  },
  {
    id: "scar", name: "SCAR", color: "#c06bff", type: "Assault rifle",
    info: "Hard-hitting rifle with strong damage per shot.",
    stats: {
      Damage:   [47, 53, 60],
      Accuracy: [64, 72, 80],
      Reload:   [52, 60, 68],
      Range:    [70, 77, 84],
    },
  },
  {
    id: "ak117", name: "AK117", color: "#ffa51f", type: "Assault rifle",
    info: "Fast fire rate that melts targets up close.",
    stats: {
      Damage:   [44, 50, 57],
      Accuracy: [58, 66, 74],
      Reload:   [66, 73, 80],
      Range:    [55, 62, 70],
    },
  },
];
