import { Metadata } from 'next';

import Chat from '@/Layout/Chat';

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat',
};
function Index() {
  return <Chat />;
}
export default Index;
