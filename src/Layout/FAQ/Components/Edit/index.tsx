'use client';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Card, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import * as Yup from 'yup';

import { useRequest } from '@/components/App';
import PageHeader from '@/components/Default/PageHeader';
import PageTitleWrapper from '@/components/Default/PageTitleWrapper';
import { toastr } from '@/utils/helpers';

import AddEditFaq from '../AddEdit';
interface PROPS {
  data: any;
}

const validationSchema = Yup.object({
  question: Yup.string().required('Question is required').min(5, 'Must be at least 5 characters'),
  answer: Yup.string().required('Answer is required').min(10, 'Must be at least 50 characters'),
});

const Index: FC<PROPS> = ({ data }) => {
  const router = useRouter();
  const { request, loading } = useRequest();
  const handleSubmit = async (values: { question: string }) => {
    const { status, message } = (await request('updateFaq', { ...values, id: data?._id })) as {
      status: boolean;
      message: string;
    };
    if (status) {
      toastr('Faq Updated Successfully!!', 'success');
      router.push('/faqs');
    } else {
      toastr(message, 'error');
    }
  };

  const initialValues = {
    question: data?.question || '',
    answer: data?.answer || '',
    category: data?.category || '',
  };

  return (
    <>
      <Head>
        <title>FAQ Management</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          heading="FAQ Management"
          content={<Typography variant="subtitle2">Update frequently asked question</Typography>}
          action={
            <Button
              href="/faqs/add"
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add FAQ
            </Button>
          }
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <AddEditFaq
              schema={validationSchema}
              handleSubmit={handleSubmit}
              initialValues={initialValues}
              loading={Boolean(loading?.updateFaq_LOADING)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Index;
