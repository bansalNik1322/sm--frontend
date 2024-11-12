import React, { useState } from 'react';

// import { useSidebarContext } from '../layout/layout-context';
import { StyledBurgerButton } from '@/styles/navbar.styles';

export const BurguerButton = () => {
  //   const { collapsed, setCollapsed } = useSidebarContext();
  const { collapsed, setCollapsed } = useState(true);

  return (
    <StyledBurgerButton open={collapsed} onClick={setCollapsed}>
      <div />
      <div />
    </StyledBurgerButton>
  );
};
