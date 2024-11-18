'use client';
import { Container, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import * as Yup from 'yup';

import { useRequest } from '@/components/App';
import { toastr } from '@/utils/helpers';

import AddEditSecurityQuestion from '../AddEdit';
import PageHeader from '../header';

interface PROPS {
  data: any;
}

const validationSchema = Yup.object({
  question: Yup.string().required('Security question is required').min(5, 'Must be at least 5 characters'),
});

const Index: FC<PROPS> = ({ data }) => {
  const router = useRouter();
  const initialValues = {
    question: data?.question || '',
  };

  const { request, loading } = useRequest();
  const handleSubmit = async (values: { question: string }) => {
    const { status } = (await request('updateSecurityQuestion', { ...values, id: data?._id })) as {
      status: boolean;
      message: string;
    };
    if (status) {
      router.push('/security-questions');
    } else {
      toastr('Something Went Wrong!!', 'error');
    }
  };

  return (
    <>
      <PageHeader />

      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <AddEditSecurityQuestion
              schema={validationSchema}
              handleSubmit={handleSubmit}
              initialValues={initialValues}
              loading={Boolean(loading?.updateSecurityQuestion_LOADING)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
