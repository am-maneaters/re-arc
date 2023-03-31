import { useEffect } from 'react';

/**
 * This component is used to make a property on a ArcGIS Accessor reactive.
 * @param param0
 * @returns
 */
export function ArcReactiveProp({
  accessor,
  property,
  value,
}: {
  accessor: __esri.Accessor;
  property: string;
  value: any;
}) {
  useEffect(() => {
    accessor.set(property, value);
    return () => {
      accessor.set(property, undefined);
    };
  }, [accessor, property, value]);
  return null;
}
