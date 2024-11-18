import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
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
        <title>FAQ Management</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          heading="FAQ Management"
          content={<Typography variant="subtitle2">Manage frequently asked questions</Typography>}
          action={
            <Button
              href={addRoute ? '/faqs' : '/faqs/add'}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={addRoute ? <HelpTwoToneIcon fontSize="small" /> : <AddTwoToneIcon fontSize="small" />}
            >
              {addRoute ? 'All FAQ' : 'Add FAQ'}
            </Button>
          }
        />
      </PageTitleWrapper>
    </>
  );
};
export default Index;
