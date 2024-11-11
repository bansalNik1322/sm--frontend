'use client';

import React, { memo } from 'react';

import { CUSTOMER } from '@/Layout/Customer';

import LeftPanel from './Components/LeftPanel';

type PROPS = {
  children: React.ReactNode;
  customerDetail: CUSTOMER;
};

function Index(props: PROPS) {
  return (
    <>
      <div className="pannel">
        <LeftPanel customerDetail={props.customerDetail} />
        <div className="rightPannel">
          <div className="CustomTab">{props.children}</div>
        </div>
      </div>
    </>
  );
}

export default memo(Index);
