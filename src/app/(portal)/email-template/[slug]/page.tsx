import axios from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import EditEmailTemplate from '@/Layout/EmailTemplate/Components/Edit';

export const metadata: Metadata = {
  title: 'Edit Email Template',
  description: 'Edit Email Template',
};

const getServerSideProps = async (slug: string) => {
  try {
    const { status, data } = await axios.get(`${process.env.BACKEND}/v1/api/admin/email/${slug}`);

    console.log('🚀 ~ getServerSideProps ~ data:', data);
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

const Index = async ({ params }: { params: { slug: string } }) => {
  const { data } = await getServerSideProps(params.slug);
  return <EditEmailTemplate data={data.data} />;
};
export default Index;
