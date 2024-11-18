import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
import React from 'react';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  permissions: string[];
}

interface MenuSection {
  header: string;
  items: MenuItem[];
}

export type MenuConfig = MenuSection[];

export const menuConfig: MenuConfig = [
  {
    header: '',
    items: [
      {
        label: 'Overview',
        href: '/',
        icon: <DesignServicesTwoToneIcon />,
        permissions: ['admin', 'user'],
      },
    ],
  },
  {
    header: 'Management',
    items: [
      {
        label: 'Faqs',
        href: '/faqs',
        icon: <HelpTwoToneIcon />,
        permissions: ['admin'],
      },
      {
        label: 'Security Questions',
        href: '/security-questions',
        icon: <SecurityTwoToneIcon />,
        permissions: ['admin'],
      },
      {
        label: 'Content Manager',
        href: '/content-manager',
        icon: <FolderTwoToneIcon />,
        permissions: ['editor', 'admin'],
      },
      {
        label: 'Email Template',
        href: '/email-template',
        icon: <EmailTwoToneIcon />,
        permissions: ['admin'],
      },
    ],
  },
  {
    header: 'Accounts',
    items: [
      {
        label: 'User Profile',
        href: '/management/profile',
        icon: <AccountCircleTwoToneIcon />,
        permissions: ['user', 'admin'],
      },
      {
        label: 'Account Settings',
        href: '/management/profile/settings',
        icon: <DisplaySettingsTwoToneIcon />,
        permissions: ['user', 'admin'],
      },
    ],
  },
];
