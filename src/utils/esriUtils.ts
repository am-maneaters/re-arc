export function isGraphicsHit(hit: __esri.ViewHit): hit is __esri.GraphicHit {
  return 'graphic' in hit;
}
