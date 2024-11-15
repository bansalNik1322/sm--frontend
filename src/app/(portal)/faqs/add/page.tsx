import { Metadata } from 'next';
import AddFaq from '@/Layout/FAQ/Add';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'FAQ',
};

async function Index({ params }: { params: { id: string } }) {
  return <AddFaq />;
}

export default Index;
