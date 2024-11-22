/* eslint-disable @typescript-eslint/ban-types */
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

import Label from '@/components/Default/Label';
import { useContainerContext } from '@/Layout/Container/context';
import { AvatarSuccess, ListItemWrapper, RootWrapper, TabsContainerWrapper } from '@/styles/Component/Chat.style';

interface Chat {
  title: string;
  unread: number;
  lastMessage: string;
  time: string;
  id: string;
}
interface PROPS {
  toggleSidebar: () => void;
  chats: Chat[];
}

const ChatSidebarContent: FC<PROPS> = ({ toggleSidebar, chats }) => {
  const {
    state: { profileDetail },
  } = useContainerContext();

  const user = {
    name: profileDetail?.name,
    avatar: profileDetail?.profile_image ?? '',
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
    // { value: 'unread', label: 'Unread' },
    // { value: 'archived', label: 'Archived' },
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
            {chats?.map((chat, index) => (
              <ListItemWrapper selected key={chat.id || index}>
                <ListItemAvatar>
                  <Avatar src={'/static/images/avatars/default-avatar.jpg'} variant="circular" alt={chat.title} />
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
                  primary={chat.title || 'Unknown User'}
                  secondary={chat.lastMessage || 'No messages yet'}
                />
                {chat.unread > 0 && (
                  <Label color="primary">
                    <b>{chat.unread}</b>
                  </Label>
                )}
              </ListItemWrapper>
            ))}
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

export default ChatSidebarContent;
