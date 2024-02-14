import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';

import { createWidget } from '../../util/createWidget';
export const ArcBasemapGallery = createWidget<
  typeof BasemapGallery,
  __esri.BasemapGalleryProperties,
  BasemapGallery
>(BasemapGallery);
