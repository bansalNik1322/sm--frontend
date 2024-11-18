import axios from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import EditFaq from '@/Layout/FAQ/Components/Edit';

export const metadata: Metadata = {
  title: 'Edit FAQ',
  description: 'Edit FAQ',
};

const getServerSideProps = async (id: string) => {
  try {
    const { status, data } = await axios.get(`${process.env.BACKEND}/v1/api/admin/faq/${id}`);

    console.log('🚀 ~ getServerSideProps ~ data:', data);
    if (status === 200) {
      return { data, status };
    } else {
      return notFound();
    }
  } catch (error: any) {
    console.error('Failed to fetch data:', error);
    return notFound();
  }
};

async function Index({ params }: { params: { id: string } }) {
  const { data } = await getServerSideProps(params.id);
  return <EditFaq data={data.data} />;
}

export default Index;
