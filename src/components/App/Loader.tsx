'use client';

import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Bars, ThreeDots } from 'react-loader-spinner';

function ButtonLoader() {
  return (
    <div className="d-flex justify-content-center">
      <ThreeDots
        height="30"
        width="30"
        color="#FFFFFF"
        ariaLabel="three-circles-rotating"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export function BarLoader() {
  return (
    <div className="d-flex justify-content-center">
      <Bars
        height="30"
        width="30"
        color="white"
        ariaLabel="three-circles-rotating"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export function SuspenseLoader() {
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: '5%' }}>
      <ThreeDots
        height="30"
        width="50"
        // color="var(--sp-primary)"
        color="white"
        ariaLabel="three-circles-rotating"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export function SimpleLoader() {
  return <Spinner animation="border" style={{ color: 'white' }} />;
}
export const useLoading = () => {
  return { ButtonLoader, SimpleLoader };
};

export function Loading() {
  // const router = useRouter();
  // const asPath = usePathname();
  const [loading] = useState(false);
  useEffect(() => {
    // const handleStart = (url: string) => url !== asPath && setLoading(true);
    // const handleComplete = (url: string) => url === asPath && setLoading(false);
    // router.events.on('routeChangeStart', handleStart);
    // router.events.on('routeChangeComplete', handleComplete);
    // router.events.on('routeChangeError', handleComplete);
    // return () => {
    //   router.events.off('routeChangeStart', handleStart);
    //   router.events.off('routeChangeComplete', handleComplete);
    //   router.events.off('routeChangeError', handleComplete);
    // };
  });
  return loading ? (
    <div className="mainLoader">
      <div className="d-flex justify-content-center" style={{ marginTop: '25%' }}>
        <ThreeDots
          height="30"
          width="50"
          // color={'#002e6e'}
          color={'white'}
          ariaLabel="three-circles-rotating"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  ) : null;
}
