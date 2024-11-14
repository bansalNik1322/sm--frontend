import axios from 'axios';
import { Metadata } from 'next';
import { GetServerSideProps } from 'next';
import { notFound, redirect } from 'next/navigation';

import AddSecurityQuestion from '@/Layout/SecurityQuestion/Add';

export const metadata: Metadata = {
  title: 'Add Security Question',
  description: 'Add Security Question',
};

async function Index() {
  return <AddSecurityQuestion />;
}

export default Index;
