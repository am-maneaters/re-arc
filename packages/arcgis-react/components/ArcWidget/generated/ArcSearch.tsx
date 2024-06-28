import Search from '@arcgis/core/widgets/Search';

import { createWidget } from '../../util/createWidget';
export const ArcSearch = createWidget<
  typeof Search,
  __esri.widgetsSearchProperties,
  Search
>(Search);
