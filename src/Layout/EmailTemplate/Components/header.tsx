import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { Button, Typography } from '@mui/material';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import PageHeader from '@/components/Default/PageHeader';
import PageTitleWrapper from '@/components/Default/PageTitleWrapper';

const Index: FC = () => {
  const path = usePathname();

  const addRoute = path.endsWith('add');
  return (
    <>
      <Head>
        <title>Security Questions - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          heading="Email Template Management"
          content={<Typography variant="subtitle2">Manage your Email Template and resources easily</Typography>}
          action={
            <Button
              href={addRoute ? '/email-template' : '/email-template/add'}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={addRoute ? <EmailTwoToneIcon fontSize="small" /> : <AddTwoToneIcon fontSize="small" />}
            >
              {addRoute ? 'All Email Template' : 'Add Email Template'}
            </Button>
          }
        />
      </PageTitleWrapper>
    </>
  );
};

export default Index;
