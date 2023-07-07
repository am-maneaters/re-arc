import { ArcMapView } from 'arcgis-react';

export default function Simple() {
  return <ArcMapView style={{ height: '100%' }} map={{ basemap: 'streets' }} />;
}
