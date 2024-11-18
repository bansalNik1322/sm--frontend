import { Metadata } from 'next';

import AddEmailTemplate from '@/Layout/EmailTemplate/Components/Add';

export const metadata: Metadata = {
  title: 'Edit Email Template',
  description: 'Edit Email Template',
};

const Index = () => {
  return <AddEmailTemplate />;
};
export default Index;
