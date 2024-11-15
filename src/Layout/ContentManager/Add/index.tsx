'use client';
import { FC } from 'react';
import Head from 'next/head';
import PageHeader from '@/components/Default/PageHeader';
import PageTitleWrapper from '@/components/Default/PageTitleWrapper';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Typography, Grid, Container } from '@mui/material';
import * as Yup from 'yup';
import AddEditContentManager from '../AddEdit';
import { useRequest } from '@/components/App';
import { toastr } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
 
const validationSchema = Yup.object({
  title: Yup.string().required('Title required').min(5, 'Must be at least 5 characters'),
});

const Index: FC = () => {
  const { loading, request } = useRequest();
  const initialValues = {
    title: '',
    metaDescription:  '',
    content:  '',
    metaKeywords:  '',
    description:   '',
    metaTitle:   '',
    active: true,
  };

  const router = useRouter();

  const handleSubmit = async (values: { [key: string]: string }) => {
    const { status, message } = (await request('updateContentManager', { ...values})) as {
      status: boolean;
      message: string;
    };
    if (status) {
      toastr('CMS Updated Successfully!!', 'success');
      router.push('/content-manager');
    } else {
      toastr(message, 'error');
    }
  };

  return (
    <>
      <Head>
        <title>Content Management - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          heading="Content Management"
          content={<Typography variant="subtitle2">Update your content and resources easily</Typography>}
          action={
            <Button
              href="/security-questions/add"
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add New Page
            </Button>
          }
        />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <AddEditContentManager
              schema={validationSchema}
              handleSubmit={handleSubmit}
              loading={Boolean(loading?.updateContentManager_LOADING)}
              initialValues={initialValues}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Index;
