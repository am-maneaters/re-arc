import Attachments from '@arcgis/core/widgets/Attachments';

import { createWidget } from '../../util/createWidget';
export const ArcAttachments = createWidget<
  typeof Attachments,
  __esri.AttachmentsProperties,
  Attachments
>(Attachments);
