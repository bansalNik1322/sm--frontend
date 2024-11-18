import axios from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import EditContentManager from '@/Layout/ContentManager/Components/Edit';

export const metadata: Metadata = {
  title: 'Edit Content Manager',
  description: 'Edit Content Manager',
};

const getServerSideProps = async (slug: string) => {
  try {
    const { status, data } = await axios.get(`${process.env.BACKEND}/v1/api/admin/content-manager/${slug}`);

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
  return <EditContentManager data={data.data} />;
};
export default Index;
