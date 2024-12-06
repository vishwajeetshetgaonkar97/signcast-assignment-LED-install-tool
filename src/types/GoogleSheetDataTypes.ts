export type ScreenMFR = {
  [key: string]: string | number;
};

export type MediaPlayerMFR = {
  [key: string]: string | number;
};

export type Mounts = {
  [key: string]: string | number;
};

export type ReceptacleBox = {
  [key: string]: string | number;
};

export type AdditionalConfiguration = {
  orientation: "vertical" | "horizontal";
  nicheType: "flat wall" | "other";
  distanceFromFloor: number;
  nicheDepth: number;
};