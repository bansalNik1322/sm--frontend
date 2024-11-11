// Components
import { Metadata } from 'next';

import Vehicles from '@/Layout/CustomerDetail/Vehicles';

export const metadata: Metadata = {
  title: 'Customer Detail - Vehicles',
  description: 'Customer Detail - Vehicles',
};

async function Index() {
  return <Vehicles />;
}

export default Index;
