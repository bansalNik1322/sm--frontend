import '../styles/globals.scss';
import './index.css';

import { Inter } from 'next/font/google';
import React from 'react';

import { AppProvider } from '@/components/App';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { getSettingsDetail } from '@/Layout/Settings/service';
import { SocketProvider } from '@/providers/SocketProvider';
import AppThemeProvider from '@/theme/ThemeProvider';
import { KEYPAIR } from '@/types/interfaces';

const inter = Inter({ subsets: ['latin'] });

async function fetchSettings() {
  const branding = (await getSettingsDetail({
    payload: {
      model: 'branding',
    },
  })) as { columnData: KEYPAIR };

  return branding;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const branding = await fetchSettings();
  if (!branding) return;
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
          integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AppThemeProvider>
          <SocketProvider>
            <AppProvider settings={branding}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </AppProvider>
          </SocketProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
