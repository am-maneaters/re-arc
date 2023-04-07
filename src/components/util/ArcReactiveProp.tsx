import { useEffect } from 'react';

/**
 * This component is used to make a property on a ArcGIS Accessor reactive.
 */
export function ArcReactiveProp({
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
    return () => {
      accessor.set(property, undefined);
    };
  }, [accessor, property, value]);
  return null;
}
