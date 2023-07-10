import BuildingExplorer from '@arcgis/core/widgets/BuildingExplorer';

import { createWidget } from '../../util/createWidget';
export const ArcBuildingExplorer = createWidget<
  typeof BuildingExplorer,
  __esri.BuildingExplorerProperties,
  BuildingExplorer
>(BuildingExplorer);
