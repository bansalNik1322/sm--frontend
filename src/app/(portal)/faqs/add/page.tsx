import { Metadata } from 'next';

import AddFaq from '@/Layout/FAQ/Components/Add';

export const metadata: Metadata = {
  title: 'Add FAQ',
  description: 'Add FAQ',
};

async function Index() {
  return <AddFaq />;
}

export default Index;
