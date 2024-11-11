'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

import { useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import { KEYPAIR, REQUEST } from '@/types/interfaces';
import { getDecodedToken, logout as clearCookies, validateAuthentication } from '@/utils/helpers';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface CONTEXTVALUE {
  state: any;
  dispatch: React.Dispatch<KEYPAIR>;
  logout: () => void;
}
const AppContext = React.createContext<CONTEXTVALUE | null>(null);
export const ContainerContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const asPath = usePathname();
  const { state, dispatch } = useCommonReducer({
    profileDetail: {},
    show: false,
  });
  const { request } = useRequest();
  // console.log(cookies);

  const value: CONTEXTVALUE = {
    state,
    dispatch,
    logout,
  };

  function logout() {
    clearCookies();
    router.push('/login');
  }

  async function fetchProfileDetails() {
    const { decoded, isValid } = getDecodedToken('');
    if (!isValid) return;
    const detail = (await request('getUserDetailById', { id: decoded.userId })) as REQUEST;
    if (detail) {
      dispatch({ profileDetail: detail });
    }
  }

  useEffect(() => {
    if (!validateAuthentication()) {
      logout();
    }
    fetchProfileDetails();
  }, [asPath]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useContainerContext() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
