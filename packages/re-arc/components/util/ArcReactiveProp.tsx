import { memo, useEffect } from 'react';

import { isEqual } from './isEqual';

function ArcReactivePropBase({
  accessor,
  property,
  value,
}: {
  accessor: __esri.Accessor;
  property: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}): null {
  useEffect(() => {
    accessor.set(property, value);
  }, [accessor, property, value]);
  return null;
}

/**
 * This component is used to make a property on a ArcGIS Accessor reactive.
 */
const ArcReactivePropMemo = memo(ArcReactivePropBase, isEqual);

export const ArcReactiveProp = ArcReactivePropMemo;
