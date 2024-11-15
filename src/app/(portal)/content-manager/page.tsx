import { Metadata } from 'next';

import ContentManager from '@/Layout/ContentManager';

export const metadata: Metadata = {
  title: 'Content Manager',
  description: 'Content Manager',
};
function Index() {
  return <ContentManager />;
}
export default Index;
