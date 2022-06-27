import React, { useContext, useState } from "react";
import MapViewComponent, {
  MapContext,
} from "../src/components/MapViewComponent";
import {
  ViewUIComponent,
  ViewUIComponentProps,
} from "../src/components/ViewUIComponent";
import {
  useWidget,
  useMapView,
  useOnEvent,
  useWatchEffect,
} from "../src/hooks";
import Search from "@arcgis/core/widgets/Search";

const StyledUIComponent: React.FC<ViewUIComponentProps> = (props) => (
  <ViewUIComponent {...props} style={{ backgroundColor: "white" }} />
);

const MouseTracker = () => {
  const mapView = useContext(MapContext);
  const [pointerPos, setPointerPos] = useState({
    x: 0,
    y: 0,
  });

  useOnEvent(mapView, "pointer-move", (event) => {
    setPointerPos({ x: event.x, y: event.y });
  });

  return (
    <div>
      X: {pointerPos.x}, Y: {pointerPos.y}
    </div>
  );
};

export function App() {
  const mapView = useMapView({ basemap: "gray-vector" }, {});

  const [SearchComponent] = useWidget(Search, { view: mapView });
  const [zoom, setZoom] = useState(10);

  useWatchEffect(
    (zoom) => {
      if (zoom !== undefined && Number.isInteger(zoom)) setZoom(zoom);
    },
    mapView,
    "zoom"
  );

  return (
    <MapViewComponent view={mapView} style={{ height: 500, width: 500 }}>
      <StyledUIComponent position={"top-right"}>
        <SearchComponent />
        <div>Zoom: {zoom}</div>
      </StyledUIComponent>
      <StyledUIComponent position={"bottom-left"}>
        <MouseTracker />
      </StyledUIComponent>
    </MapViewComponent>
  );
}
