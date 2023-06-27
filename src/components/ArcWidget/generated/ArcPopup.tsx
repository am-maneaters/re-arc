import Popup from '@arcgis/core/widgets/Popup';

import { createWidget } from '../../util/createWidget';
export const ArcPopup = createWidget<
  typeof Popup,
  __esri.PopupProperties,
  Popup
>(Popup);
