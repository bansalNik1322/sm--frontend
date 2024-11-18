import { Metadata } from 'next';

import AddSecurityQuestion from '@/Layout/SecurityQuestion/Components/Add';

export const metadata: Metadata = {
  title: 'Add Security Question',
  description: 'Add Security Question',
};

async function Index() {
  return <AddSecurityQuestion />;
}

export default Index;
