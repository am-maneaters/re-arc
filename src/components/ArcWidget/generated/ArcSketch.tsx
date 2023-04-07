import Sketch from '@arcgis/core/widgets/Sketch';

import { createWidget } from '../../util/createWidget';
export const ArcSketch = createWidget<
  typeof Sketch,
  __esri.SketchProperties,
  Sketch
>(Sketch);
