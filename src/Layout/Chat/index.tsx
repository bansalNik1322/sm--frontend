'use client';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { Box, Divider, Drawer, IconButton, styled, useTheme } from '@mui/material';
import Head from 'next/head';
import { FC, useEffect, useState } from 'react';

import Scrollbar from '@/components/Default/Scrollbar';

import BottomBarContent from './Components/BottomBarContent';
import ChatContent from './Components/ChatContent';
import SidebarContent from './Components/SidebarContent';
import TopBarContent from './Components/TopBarContent';

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`,
);

const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`,
);

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`,
);

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(2)};
        align-items: center;
`,
);

export const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.colors.alpha.white[100]};
`,
);

const DrawerWrapperMobile = styled(Drawer)(
  () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`,
);

const Index: FC = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true); // Sidebar visibility state

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
  };

  return (
    <>
      <Head>
        <title>Messenger - Applications</title>
      </Head>
      <RootWrapper className="Mui-FixedWrapper">
        <DrawerWrapperMobile
          sx={{
            display: { lg: 'none', xs: 'inline-block' },
          }}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <Scrollbar>
            <SidebarContent toggleSidebar={toggleSidebar} />
          </Scrollbar>
        </DrawerWrapperMobile>

        {isSidebarVisible && (
          <Sidebar
            sx={{
              display: { xs: 'none', lg: 'inline-block' },
            }}
          >
            <Scrollbar>
              <SidebarContent toggleSidebar={toggleSidebar} />
            </Scrollbar>
          </Sidebar>
        )}

        <ChatWindow>
          <ChatTopBar
            sx={{
              display: 'flex',
            }}
          >
            <IconButtonToggle
              sx={{
                display: { lg: 'none', xs: 'flex' },
                mr: 2,
              }}
              color="primary"
              onClick={handleDrawerToggle}
              size="small"
            >
              <MenuTwoToneIcon />
            </IconButtonToggle>
            {!isSidebarVisible && (
              <IconButtonToggle
                sx={{
                  display: { lg: 'flex', xs: 'none' },
                  mr: 2,
                }}
                color="primary"
                onClick={toggleSidebar}
                size="small"
              >
                <MenuTwoToneIcon />
              </IconButtonToggle>
            )}
            <TopBarContent />
          </ChatTopBar>
          <Box flex={1}>
            <Scrollbar>
              <ChatContent />
            </Scrollbar>
          </Box>
          <Divider />
          <BottomBarContent />
        </ChatWindow>
      </RootWrapper>
    </>
  );
};

export default Index;
