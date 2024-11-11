'use client';
import React, { useContext } from 'react';

import useGlobalSetting from '@/hooks/useGlobalSettings';
import settings from '@/settings.js';
import { SETTINGS_PAYLOAD } from '@/types/interfaces';

import { useAlert } from './alert';

interface Props {
  children: JSX.Element | JSX.Element[];
  settings: any;
}

interface ALERT {
  toast: (title: string, icon: any) => void;
}
interface CONTEXTVALUE {
  alert: ALERT;
  updateGlobalSetting: (data: SETTINGS_PAYLOAD) => void;
  getGlobalSettings: () => SETTINGS_PAYLOAD;
}
const AppContext = React.createContext<CONTEXTVALUE | null>(null);
export const AppProvider = ({ children, settings }: Props) => {
  const alert: ALERT = useAlert();
  const { updateGlobalSetting, getGlobalSettings } = useGlobalSetting({ branding: settings });

  const value: CONTEXTVALUE = { alert, updateGlobalSetting, getGlobalSettings };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
export { useRequest } from './request';
export { useLoading } from './Loader';

export function useSettings() {
  return settings;
}
