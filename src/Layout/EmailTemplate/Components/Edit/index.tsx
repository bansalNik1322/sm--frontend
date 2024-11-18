'use client';
import { Container, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import * as Yup from 'yup';

import { useRequest } from '@/components/App';
import Footer from '@/Layout/Container/Components/Footer';
import { toastr } from '@/utils/helpers';

import AddEditEmailTemplate, { IEmailTemplate } from '../AddEdit';
import PageHeader from '../header';

interface PROPS {
  data: any;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title required').min(5, 'Must be at least 5 characters'),
});

const Index: FC<PROPS> = ({ data }) => {
  const { request, loading } = useRequest();
  const router = useRouter();
  const initialValues = {
    title: data?.title || '',
    slug: data?.slug || '',
    template: data?.template || '',
    subject: data?.subject || '',
  };

  const handleSubmit = async (values: IEmailTemplate) => {
    const { status, message } = (await request('updateEmailTemplate', { ...values, slug: data?.slug })) as {
      status: boolean;
      message: string;
    };
    if (status) {
      toastr('Email Templated Created Successfully!!', 'success');
      router.push('/email-template');
    } else {
      toastr(message, 'error');
    }
  };
  return (
    <>
      <PageHeader />

      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <AddEditEmailTemplate
              schema={validationSchema}
              handleSubmit={handleSubmit}
              loading={Boolean(loading?.updateEmailTemplate_LOADING)}
              initialValues={initialValues}
              edit={false}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Index;
