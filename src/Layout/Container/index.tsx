'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import { validateAuthentication } from '@/utils/helpers';

import { ContainerContextProvider } from './context';

const Header = dynamic(() => import('./Components/Header'), {
  loading: () => <div></div>,
  ssr: false,
});
const Footer = dynamic(() => import('./Components/Footer'), {
  loading: () => <div></div>,
  ssr: false,
});

type Props = {
  header?: boolean | false;
  children: JSX.Element | string | JSX.Element[];
  footer?: boolean | false;
  role?: string;
};
function Container({ children, header }: Props) {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;
  return (
    <>
      {validateAuthentication() && (
        <div>
          {!header && <Header />}
          <div className="viewPort">{children}</div>
          <Footer />
        </div>
      )}
    </>
  );
}

const IndexContainer = ({ children, header }: Props) => {
  return (
    <ContainerContextProvider>
      <Container {...{ header }}>{children}</Container>
    </ContainerContextProvider>
  );
};
export default IndexContainer;
