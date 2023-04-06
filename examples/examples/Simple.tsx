import React from 'react';

import { ArcMapView } from '../../src';

export default function Simple() {
  return (
    <ArcMapView style={{ height: '100vh' }} map={{ basemap: 'streets' }} />
  );
}
