import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Admin Home Page',
  keywords: 'Dashbaord',
};

import Dashbaord from '@/Layout/Dashboard';

export default function Index() {
  return <Dashbaord />;
}
