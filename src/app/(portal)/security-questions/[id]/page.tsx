import axios from 'axios';
import { Metadata } from 'next';
import { GetServerSideProps } from 'next';
import { notFound, redirect } from 'next/navigation';

import EditSecurityQuestion from '@/Layout/SecurityQuestion/Edit';

export const metadata: Metadata = {
  title: 'Security Question',
  description: 'Security Question',
};

const getServerSideProps = async (id: string) => {
  try {
    const { status, data } = await axios.get(`${process.env.BACKEND}/v1/api/admin/security-question/${id}`);

    if (status === 200) {
      return { data, status };
    } else {
      return notFound();
    }
  } catch (error: any) {
    console.error('Failed to fetch data:', error?.message);
    return notFound();
  }
};

async function Index({ params }: { params: { id: string } }) {
  const { data } = await getServerSideProps(params.id);
  return <EditSecurityQuestion data={data.data} />;
}

export default Index;
