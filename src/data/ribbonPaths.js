/* Rim-light outlines of the ribbons on a 1200 x 779 design canvas. Used by the canvas renderer
   (RibbonCanvas), the flowing streaks and the loader so everything lines up exactly.
   Paths run past the canvas edges so nothing ever shows an open end. */
export const RIBBON_VIEWBOX = '0 0 1200 779'
export const RIBBON_W = 1200
export const RIBBON_H = 779

export const ribbonOutlines = [
  'M-500 52 H760 A83 83 0 0 1 760 218 H320 A255 255 0 0 0 65 473 V1500',
  'M230 1500 V500 A115 115 0 0 1 345 385 H760 A83 83 0 0 1 760 551 H480 A83 83 0 0 0 480 715 H1800',
  'M1800 548 H1090 A78 78 0 0 1 1012 470 V130 A80 80 0 0 1 1172 130 V330',
]
