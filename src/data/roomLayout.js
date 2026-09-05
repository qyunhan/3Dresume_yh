// Stable transforms shared by the procedural room and its in-room markers.
// Portfolio copy belongs in projects.js, not in this scene contract.
import { roomDestinations } from './roomDestinations'

export const roomLayout = {
  room: { width: 14, depth: 11, backWallZ: -5.5 },

  window: { position: [-6.84, 3.9, -3.6], rotation: [0, Math.PI / 2, 0] },
  desk: { position: [-3.65, 1.35, -4.35] },
  chair: { position: [-3.65, 1.05, -2.8] },
  laptop: {
    position: [-3.65, 2.25, -4.05],
    markerPosition: [-3.65, 3.25, -3.88],
    sectionId: roomDestinations.laptop.sectionId,
  },
  noticeBoard: {
    position: [0, 3.55, -5.25],
    markerPosition: [0, 4.75, -5.05],
    sectionId: roomDestinations.noticeBoard.sectionId,
  },
  tv: {
    position: [3.55, 3.05, -5.15],
    markerPosition: [3.55, 4.4, -4.95],
    sectionId: roomDestinations.tv.sectionId,
  },
  mediaConsole: { position: [3.55, 1.05, -4.7] },
  reports: {
    position: [3.65, 0.75, -1.55],
    markerPosition: [3.65, 2.25, -1.35],
    sectionId: roomDestinations.reports.sectionId,
  },
  rug: { position: [-0.45, 0.04, -1.4] },
  cat: { position: [-2.1, 0.45, -0.65] },
  shelves: { position: [-0.8, 4.35, -5.2] },
  door: { position: [6.84, 2.65, -4.4], rotation: [0, -Math.PI / 2, 0] },
}
