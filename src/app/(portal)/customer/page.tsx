// Components
import { Metadata } from 'next';

import Customer from '@/Layout/Customer';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Get Customers',
};

function Index() {
  return <Customer />;
}

export default Index;
