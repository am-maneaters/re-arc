import { memo, useEffect } from 'react';
import isEqual from 'react-fast-compare';

function ArcReactivePropBase({
  accessor,
  property,
  value,
}: {
  accessor: __esri.Accessor;
  property: string;
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
