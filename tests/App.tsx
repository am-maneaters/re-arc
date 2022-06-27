import React, { useEffect, useState } from "react";
import { useMapView } from "../src/hooks/useMapView";
import MapViewComponent from "../src/components/MapViewComponent";
import { ViewUIComponent } from "../src/components/ViewUIComponent";
import { useWidget } from "../src/hooks/useWidget";
import Search from "@arcgis/core/widgets/Search";

import { useWatchEffect, useOnEvent } from "../src/hooks/useWatchEffect";
export function App() {
  const mapView = useMapView({ basemap: "gray-vector" }, {});

  const [search, SearchComponent] = useWidget(Search, { view: mapView });
  const [zoom, setZoom] = useState(10);

  useWatchEffect(
    (zoom) => {
      if (zoom !== undefined && Number.isInteger(zoom)) setZoom(zoom);
    },
    mapView,
    "zoom"
  );

  useOnEvent(mapView as __esri.View, "click", (event) => {
    console.log(event);
  });

  useEffect(() => {
    console.log(zoom);
  }, [zoom]);

  console.log("UPDATING");

  return (
    <MapViewComponent view={mapView} style={{ height: 500, width: 500 }}>
      <ViewUIComponent position={"top-right"}>
        <SearchComponent />
      </ViewUIComponent>
    </MapViewComponent>
  );
}
