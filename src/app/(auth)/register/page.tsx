// Components
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register New Users',
  keywords: 'Register ',
};
// Components
import Register from '@/Layout/Auth/Register';

async function Index() {
  return (
    <>
      <Register />
    </>
  );
}

export default Index;
