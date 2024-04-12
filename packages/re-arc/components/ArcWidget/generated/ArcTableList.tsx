import TableList from '@arcgis/core/widgets/TableList';

import { createWidget } from '../../util/createWidget';
export const ArcTableList = createWidget<
  typeof TableList,
  __esri.TableListProperties,
  TableList
>(TableList);
