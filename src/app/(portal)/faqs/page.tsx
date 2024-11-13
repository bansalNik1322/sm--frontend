import { Metadata } from 'next';

import FAQ from '@/Layout/FAQ';

export const metadata: Metadata = {
  title: 'FAQS',
  description: 'Frequently Asked Questions',
};
function Index() {
  return <FAQ />;
}
export default Index;
