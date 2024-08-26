import * as React from 'react';
import {
  BrowserRouter as BrowserRouterContext,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { AppHeader } from './app-header';
import './app.css';

import { TanStack01 } from '../examples/tan-stack';
import { ReactVirtualized01 } from '../examples/react-virtualized';
import { Virtuoso01 } from '../examples/virtuoso';
import { ReadmePage } from '../examples/readme';

const RootStyles = styled.main`
  & {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
`;

interface MainMenuLink {
  title: string;
  path: string;
}

interface AppMenuTab extends MainMenuLink {
  constructor: React.JSXElementConstructor<unknown>;
}

const appMenuTabs: AppMenuTab[] = [
  {
    title: 'README',
    path: '/readme',
    constructor: () => <ReadmePage />,
  },
  {
    title: 'virtuoso-01',
    path: '/virtuoso-01',
    constructor: () => <Virtuoso01 />,
  },
  {
    title: 'TanStack-01',
    path: '/tanStack-01',
    constructor: () => <TanStack01 />,
  },
  {
    title: 'react-virtualized-01',
    path: '/react-virtualized-01',
    constructor: () => <ReactVirtualized01 />,
  },
];

export function App() {
  return (
    <BrowserRouterContext>
      <RootStyles>
        <Container maxWidth="xl">
          <AppHeader links={appMenuTabs} />
          <Routes>
            {appMenuTabs.map(({ path, constructor: RouteElement }) => (
              <Route key={path} path={`${path}/*`} element={<RouteElement />} />
            ))}
            <Route
              path="/*"
              element={<Navigate to={appMenuTabs[0].path} replace />}
            />
          </Routes>
        </Container>
      </RootStyles>
    </BrowserRouterContext>
  );
}
