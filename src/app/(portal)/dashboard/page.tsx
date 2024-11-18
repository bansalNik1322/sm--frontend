import { Metadata } from 'next';

import Dashboard from '@/Layout/Dashboard';

export const metadata: Metadata = {
  title: 'Security Question',
  description: 'Security Question',
};
function Index() {
  return <Dashboard />;
}
export default Index;
