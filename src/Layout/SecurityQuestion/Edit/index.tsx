'use client';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

import PageHeader from '@/components/Default/PageHeader';
import PageTitleWrapper from '@/components/Default/PageTitleWrapper';
import { FC } from 'react';

import * as Yup from 'yup';
import { useRequest } from '@/components/App';
import { toastr } from '@/utils/helpers';
import AddEditSecurityQuestion from '../AddEdit';

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
    const { status, message } = (await request('updateSecurityQuestion', { ...values, id: data?._id })) as {
      status: boolean;
      message: string;
    };
    if (status) {
      router.push('/security-questions');
    } else {
      toastr(message, 'error');
    }
  };

  return (
    <>
      <Head>
        <title>Security Questions - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          heading="Edit Security Question"
          content={<Typography variant="subtitle2">Update your security questions and settings</Typography>}
          action={
            <Button
              href="/security-questions/add"
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add Security Question
            </Button>
          }
        />
      </PageTitleWrapper>

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
