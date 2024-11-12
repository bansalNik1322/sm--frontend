import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import { SuspenseLoader } from '@/components/App/Loader';
import AppThemeProvider from '@/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Settings',
};
// Components
const Container = dynamic(() => import('@/Layout/Container'), {
  loading: () => <SuspenseLoader />,
  ssr: false,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppThemeProvider>
      <Container>
        <>{children}</>
      </Container>
    </AppThemeProvider>
  );
};

export default Layout;
