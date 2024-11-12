import { Metadata } from 'next';

import SecurityQuestion from '@/Layout/SecurityQuestion';

export const metadata: Metadata = {
  title: 'Security Question',
  description: 'Security Question',
};
function Index() {
  return <SecurityQuestion />;
}
export default Index;
