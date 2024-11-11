'use client';
import { useCallback, useEffect, useMemo } from 'react';

import { useSettings } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import { KEYPAIR, SETTINGS_PAYLOAD } from '@/types/interfaces';

interface PROPS {
  branding: {
    columnData: KEYPAIR;
  };
}

const useGlobalSetting = (props: PROPS) => {
  const { branding } = props;
  const settings = useSettings();

  const { state, dispatch } = useCommonReducer({
    primaryColor: (branding?.columnData?.primaryColor || 'red') as string,
    font: (branding?.columnData?.font || 'Inter') as string,
  });
  const updateGlobalSetting = useCallback((data: SETTINGS_PAYLOAD) => {
    dispatch({
      ...data,
    });
  }, []);

  const logoURL = useMemo(() => {
    if (state?.logo) {
      return state?.logo;
    } else if (branding?.columnData?.logo) {
      return `/spimages/${branding?.columnData?.logo}`;
    } else {
      return '/assets/images/logoMain.png';
    }
  }, [branding?.columnData?.logo, state?.logo]);

  const banneURL = useMemo(() => {
    if (state?.banner) {
      return state?.banner;
    } else if (branding?.columnData?.banner) {
      return `/spimages/${branding?.columnData?.banner}`;
    } else {
      return '/assets/images/logoMain.png';
    }
  }, [branding?.columnData?.banner, state?.banner]);

  const getGlobalSettings: () => SETTINGS_PAYLOAD = useCallback(() => {
    return {
      logo: logoURL,
      banner: banneURL,
      font: state.font,
      primaryColor: state.primaryColor,
    };
  }, [branding?.columnData, state, logoURL, banneURL]);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty('--sp-primary', state?.primaryColor);
    root?.style.setProperty('--sp-font-family', state?.font);
  }, [state]);

  return {
    updateGlobalSetting,
    getGlobalSettings,
  };
};

export default useGlobalSetting;
