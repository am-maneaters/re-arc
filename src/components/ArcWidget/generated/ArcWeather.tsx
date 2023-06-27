import Weather from '@arcgis/core/widgets/Weather';

import { createWidget } from '../../util/createWidget';
export const ArcWeather = createWidget<
  typeof Weather,
  __esri.WeatherProperties,
  Weather
>(Weather);
