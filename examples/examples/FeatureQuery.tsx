import React from 'react';

import { ArcMapView, ArcUI } from '../../src';

export default function FeatureQuery() {
  return (
    <ArcMapView map={{ basemap: 'dark-gray-vector' }}>
      <ArcUI position="top-right">
        <div>hello</div>
      </ArcUI>
    </ArcMapView>
  );
}
