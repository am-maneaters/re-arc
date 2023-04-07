import Bookmarks from '@arcgis/core/widgets/Bookmarks';

import { createWidget } from '../../util/createWidget';
export const ArcBookmarks = createWidget<
  typeof Bookmarks,
  __esri.BookmarksProperties,
  Bookmarks
>(Bookmarks);
