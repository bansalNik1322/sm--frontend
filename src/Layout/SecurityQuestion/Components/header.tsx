import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
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
          heading="Security Settings"
          content={<Typography variant="subtitle2">Manage your security questions and settings</Typography>}
          action={
            <Button
              href={addRoute ? '/security-questions' : '/security-questions/add'}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={addRoute ? <SecurityTwoToneIcon fontSize="small" /> : <AddTwoToneIcon fontSize="small" />}
            >
              {addRoute ? 'All Security Question' : 'Add Security Question'}
            </Button>
          }
        />
      </PageTitleWrapper>
    </>
  );
};
export default Index;
