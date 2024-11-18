import { Metadata } from 'next';

import AddContentManager from '@/Layout/ContentManager/Components/Add';

export const metadata: Metadata = {
  title: 'Add Content Manager',
  description: 'Add Content Manager',
};

const Index = async () => {
  return <AddContentManager />;
};
export default Index;
