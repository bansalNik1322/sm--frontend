import { Metadata } from 'next';

import EmailTemplate from '@/Layout/EmailTemplate';

export const metadata: Metadata = {
  title: 'Email Template',
  description: 'Email Template',
};
function Index() {
  return <EmailTemplate />;
}
export default Index;
