import { Avatar, Box, ListItemButton, styled } from '@mui/material';

export const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
            background-color: ${theme.colors.success.lighter};
            color: ${theme.colors.success.main};
            width: ${theme.spacing(8)};
            height: ${theme.spacing(8)};
            margin-left: auto;
            margin-right: auto;
      `,
);
export const RootWrapper = styled(Box)(
  ({ theme }) => `
          padding: ${theme.spacing(2.5)};
    `,
);
export const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
          &.MuiButtonBase-root {
              margin: ${theme.spacing(1)} 0;
          }
    `,
);
export const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
          .MuiTabs-indicator {
              min-height: 4px;
              height: 4px;
              box-shadow: none;
              border: 0;
          }
  
          .MuiTab-root {
              &.MuiButtonBase-root {
                  padding: 0;
                  margin-right: ${theme.spacing(3)};
                  font-size: ${theme.typography.pxToRem(16)};
                  color: ${theme.colors.alpha.black[50]};
  
                  .MuiTouchRipple-root {
                      display: none;
                  }
              }
  
              &.Mui-selected:hover,
              &.Mui-selected {
                  color: ${theme.colors.alpha.black[100]};
              }
          }
    `,
);
