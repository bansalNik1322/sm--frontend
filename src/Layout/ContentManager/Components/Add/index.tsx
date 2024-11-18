'use client';
import { Container, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import * as Yup from 'yup';

import { useRequest } from '@/components/App';
import { toastr } from '@/utils/helpers';

import AddEditContentManager, { IContentManager } from '../AddEdit';
import PageHeader from '../header';

const validationSchema = Yup.object({
  title: Yup.string().required('Title required').min(5, 'Must be at least 5 characters'),
});

const Index: FC = () => {
  const { loading, request } = useRequest();
  const initialValues = {
    title: '',
    metaDescription: '',
    content: '',
    metaKeywords: '',
    description: '',
    metaTitle: '',
    active: true,
    slug: '',
  };

  const router = useRouter();

  const handleSubmit = async (values: IContentManager) => {
    const { status, message } = (await request('createContentManager', { ...values })) as {
      status: boolean;
      message: string;
    };
    if (status) {
      toastr('CMS Created Successfully!!', 'success');
      router.push('/content-manager');
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
            <AddEditContentManager
              schema={validationSchema}
              handleSubmit={handleSubmit}
              loading={Boolean(loading?.updateContentManager_LOADING)}
              initialValues={initialValues}
              edit={false}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Index;
