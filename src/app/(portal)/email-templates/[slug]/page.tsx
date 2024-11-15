import { Metadata } from 'next';

import ContentManager from '@/Layout/ContentManager';

export const metadata: Metadata = {
  title: 'FAQS',
  description: 'Frequently Asked Questions',
};
function Index() {
  return <ContentManager />;
}
export default Index;
