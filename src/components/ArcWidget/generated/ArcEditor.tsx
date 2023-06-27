import Editor from '@arcgis/core/widgets/Editor';

import { createWidget } from '../../util/createWidget';
export const ArcEditor = createWidget<
  typeof Editor,
  __esri.EditorProperties,
  Editor
>(Editor);
