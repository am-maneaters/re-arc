import { CodeDisplay } from '../components/CodeDisplay';

export default function Home() {
  return (
    <div className="prose dark:prose-invert max-w-none h-full p-4 overflow-auto box-border">
      <h1>Quickstart</h1>
      <p>
        arcgis-react is a Typescript library that provides React wrappers for
        the <code>@arcgis/core</code> library, enabling you to build interactive
        and feature-rich mapping applications using React and the ArcGIS JS SDK.
        This library combines the capabilities of ArcGIS with the flexibility
        and simplicity of React, making it easy for developers to create
        engaging maps and spatial applications.
      </p>
      <h2>Installation</h2>
      <p>Install `arcgis-react` using your favorite package manager</p>
      <CodeDisplay
        code={`
npm install arcgis-react
yarn add arcgis-react
pnpm add arcgis-react`}
      />
      <h2>Configuration</h2>
      <p>
        arcgis-react requires that you have both React & the ArcGIS JS API
        installed in your application.
      </p>
      <h2>Basic Usage</h2>
      <p>
        Once you have configured arcgis-react, you can start using it in your
        React components. Import the necessary components from the arcgis-react
        library and create a map component.
      </p>
      <p>
        Here&apos;s a basic example of how you can create a map component using
        arcgis-react:
      </p>
      <CodeDisplay
        code={`
import { ArcMapView } from 'arcgis-react';
const MyMap = () => <ArcMapView zoom={10} center={[-122.4194, 37.7749]} />;
        `}
      />
      <h2>Advanced Usage</h2>
      <p>
        arcgis-react provides a wide range of components and utilities that
        allow you to create complex mapping applications. You can explore the
        example projects to learn more about the available components and their
        usage.
      </p>
      <h2>Additional Resources</h2>

      <ul>
        <li>
          <a
            href="https://github.com/am-maneaters/arcgis-react"
            target="_blank"
            rel="noreferrer"
          >
            arcgis-react GitHub Repository
          </a>
          : Explore the complete documentation for arcgis-react, including
          component references, usage examples, and guides.
        </li>
        <li>
          <a
            href="https://developers.arcgis.com"
            target="_blank"
            rel="noreferrer"
          >
            ArcGIS for Developers
          </a>
          : Visit the official ArcGIS for Developers website to access the
          ArcGIS API documentation, tutorials, and additional resources.
        </li>
        <li>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            React Documentation
          </a>
          : If you are new to React, the official React documentation is a great
          place to start learning about React concepts and best practices.
        </li>
        <li>
          <a
            href="https://developers.arcgis.com/calcite-design-system/"
            target="_blank"
            rel="noreferrer"
          >
            Calcite Design System
          </a>
          : Calcite Design System is a collection of design and development
          resources designed and maintained by Esri. It provides a set of
          reusable components for building mapping applications (this website is
          built using Calcite components!)
        </li>
      </ul>
      <p className="italic text-0h">
        This project is not affiliated with or supported by Esri, the company
        behind ArcGIS. `arcgis-react` is an independent open-source effort to
        provide ArcGIS integration for React applications. Any reference to
        &quot;ArcGIS&quot; or related terms is for compatibility purposes only
        and does not imply official association with Esri. For Esri product
        support, please refer to their{' '}
        <a
          href="https://support.esri.com/en-us/products"
          target="_blank"
          rel="noreferrer"
        >
          official resources
        </a>
        .
      </p>
    </div>
  );
}
