/* eslint-disable @typescript-eslint/ban-types */
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Switch,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

import Label from '@/components/Default/Label';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
          background-color: ${theme.colors.success.lighter};
          color: ${theme.colors.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `,
);

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `,
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `,
);

const TabsContainerWrapper = styled(Box)(
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

interface PROPS {
  toggleSidebar: () => void;
}
const SidebarContent: FC<PROPS> = ({ toggleSidebar }) => {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Software Developer',
  };

  const [state, setState] = useState({
    invisible: true,
  });

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const [currentTab, setCurrentTab] = useState<string>('all');

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'archived', label: 'Archived' },
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <RootWrapper>
      <Box display="flex" alignItems="flex-start">
        <Avatar alt={user.name} src={user.avatar} />
        <Box
          sx={{
            ml: 1.5,
            flex: 1,
          }}
        >
          <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            <Box>
              <Typography variant="h5" noWrap>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {user.jobtitle}
              </Typography>
            </Box>
            <IconButton
              onClick={toggleSidebar}
              sx={{
                p: 1,
              }}
              size="small"
              color="primary"
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          mb: 1,
          mt: 2,
        }}
        variant="h3"
      ></Typography>

      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map(tab => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>

      <Box mt={2}>
        {currentTab === 'all' && (
          <List disablePadding component="div">
            <ListItemWrapper selected>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true,
                }}
                primary="Zain Baptista"
                secondary="Hey there, how are you today? Is it ok if I call you?"
              />
              <Label color="primary">
                <b>2</b>
              </Label>
            </ListItemWrapper>
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true,
                }}
                primary="Kierra Herwitz"
                secondary="Hi! Did you manage to send me those documents"
              />
            </ListItemWrapper>
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true,
                }}
                primary="Craig Vaccaro"
                secondary="Ola, I still haven't received the program schedule"
              />
            </ListItemWrapper>
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/4.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true,
                }}
                primary="Adison Press"
                secondary="I recently did some buying on Amazon and now I'm stuck"
              />
              <Label color="primary">
                <b>8</b>
              </Label>
            </ListItemWrapper>
          </List>
        )}
        {currentTab === 'unread' && (
          <List disablePadding component="div">
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true,
                }}
                primary="Zain Baptista"
                secondary="Hey there, how are you today? Is it ok if I call you?"
              />
              <Label color="primary">
                <b>2</b>
              </Label>
            </ListItemWrapper>
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/4.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true,
                }}
                primary="Adison Press"
                secondary="I recently did some buying on Amazon and now I'm stuck"
              />
              <Label color="primary">
                <b>8</b>
              </Label>
            </ListItemWrapper>
          </List>
        )}
        {currentTab === 'archived' && (
          <Box pb={3}>
            <Divider
              sx={{
                mb: 3,
              }}
            />
            <AvatarSuccess>
              <CheckTwoToneIcon />
            </AvatarSuccess>
            <Typography
              sx={{
                mt: 2,
                textAlign: 'center',
              }}
              variant="subtitle2"
            >
              Hurray! There are no archived chats!
            </Typography>
            <Divider
              sx={{
                mt: 3,
              }}
            />
          </Box>
        )}
      </Box>
    </RootWrapper>
  );
};

export default SidebarContent;
