import { Metadata } from 'next';

import AddContentManager from '@/Layout/ContentManager/Add';
import axios from 'axios';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Content Manager',
  description: 'Edit Content Manager',
};

 
const Index = async () => {

  return <AddContentManager />;
};
export default Index;
