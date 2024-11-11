// Components
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to Portal',
  keywords: 'Login ',
};
// Components
const Login = dynamic(() => import('@/Layout/Auth/Login'), {
  loading: () => <SuspenseLoader />,
  ssr: false,
});

async function Index() {
  return <Login />;
}
export default Index;
