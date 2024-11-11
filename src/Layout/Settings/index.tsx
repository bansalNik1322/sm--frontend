'use client';
import React from 'react';

import LeftPanel from './Components/LeftPanel';

type PROPS = {
  children: React.ReactNode;
};

function Index(props: PROPS) {
  return (
    <div className="pannel">
      <LeftPanel />
      <div className="rightPannel">
        <div className="CustomTab">{props?.children}</div>
      </div>
    </div>
  );
}

export default Index;
