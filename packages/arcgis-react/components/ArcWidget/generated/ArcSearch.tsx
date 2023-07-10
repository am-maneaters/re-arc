import Search from '@arcgis/core/widgets/Search';

import { createWidget } from '../../util/createWidget';
export const ArcSearch = createWidget<
  // @ts-expect-error - Search is not typed correctly
  typeof Search,
  __esri.SearchProperties,
  Search
>(Search);
