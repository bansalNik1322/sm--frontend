'use client';
import { useCallback } from 'react';

import * as services from '@/store/services';
import { KEYPAIR, REQUEST } from '@/types/interfaces';

import { useCommonReducer } from './reducer';

export const useRequest = () => {
  const { state, dispatch } = useCommonReducer({
    loading: {},
  });
  const request = useCallback(
    (type: string, payload?: KEYPAIR) => {
      // Set Loading to True
      return new Promise((resolve, reject) => {
        dispatch({
          loading: {
            [type + '_LOADING']: true,
          },
        });
        // Execute API Call
        const requestPayload = {} as {
          payload: KEYPAIR;
        };
        if (payload) {
          requestPayload['payload'] = payload;
        }

        try {
          const reqService = services as any;
          if (!reqService[type as keyof typeof reqService]) return;
          reqService[type as keyof typeof reqService](requestPayload).then((data: REQUEST) => {
            dispatch({
              loading: {
                [type + '_LOADING']: false,
              },
              data,
            });
            return resolve(data);
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    [state],
  );
  return {
    request,
    loading: state.loading as KEYPAIR,
  };
};
