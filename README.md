<div align='center' style="display: flex; justify-content: center">
<picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/50883428/230233939-5498486a-fb92-45aa-82b1-673d4d01ec51.png">
   <img alt="ArcGIS React" width="500px" src="https://user-images.githubusercontent.com/50883428/230234038-36fea231-5e84-43f3-8a69-6b0b685e53f5.png" />
</picture>
<h3>Components & Hooks for the ArcGIS JS SDK</h3>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/arcgis-react">
    <img src="https://img.shields.io/npm/v/arcgis-react" alt="npm">
  </a>
  <a href="https://www.npmjs.com/package/@arcgis/core">
    <img src="https://img.shields.io/badge/dynamic/json?color=blue&label=%40arcgis%2Fcore&query=%24.dependencies%5B%22%40arcgis%2Fcore%22%5D&url=https%3A%2F%2Fraw.githubusercontent.com%2FsamMatenaer%2Farcgis-react-utils%2Fmain%2Fpackage.json" alt="arcgis version">
  </a>
  <img src="https://img.shields.io/npm/dt/arcgis-react" alt="downloads">
  <img src="https://img.shields.io/npm/l/arcgis-react" alt="license">
</div>

---

# Quick Start

### Install dependencies

```
npm i @arcgis/core arcgis-react
```


### Simple Components

```tsx
import React from 'react';
import { ArcMapView } from 'arcgis-react';

const SimpleMap = () => <ArcMapView map={{ basemap: 'streets-vector' }} />;

const SimpleScene = () => <ArcSceneView map={{ basemap: 'streets-vector' }} />;

const SimpleMapWithUI = () => (
  <ArcMapView map={{ basemap: 'streets-vector' }}>
    <ArcUI position="bottom-left">
      <div>hello world</div>
    </ArcUI>
  </ArcMapView>
);

```

