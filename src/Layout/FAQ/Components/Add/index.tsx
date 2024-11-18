'use client';
import { Container, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import * as Yup from 'yup';

import { useRequest } from '@/components/App';
import { toastr } from '@/utils/helpers';

import AddEditFaq from '../AddEdit';
import PageHeader from '../header';

const validationSchema = Yup.object({
  question: Yup.string().required('Question is required').min(5, 'Must be at least 5 characters'),
  answer: Yup.string().required('Answer is required').min(10, 'Must be at least 50 characters'),
});

const Index: FC = () => {
  const router = useRouter();
  const { request, loading } = useRequest();
  const handleSubmit = async (values: { question: string }) => {
    const { status, message } = (await request('createFaq', { ...values })) as {
      status: boolean;
      message: string;
    };
    if (status) {
      toastr('Faq created Successfully!', 'success');
      router.push('/faqs');
    } else {
      toastr(message, 'error');
    }
  };

  const initialValues = {
    question: '',
    answer: '',
    category: 'account_management',
  };

  return (
    <>
      <PageHeader />
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <AddEditFaq
              schema={validationSchema}
              handleSubmit={handleSubmit}
              initialValues={initialValues}
              loading={Boolean(loading?.createFaq_LOADING)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Index;
