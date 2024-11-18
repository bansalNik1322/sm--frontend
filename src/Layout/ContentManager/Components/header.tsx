import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';
import { Button, Typography } from '@mui/material';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import PageHeader from '@/components/Default/PageHeader';
import PageTitleWrapper from '@/components/Default/PageTitleWrapper';

const Index: FC = () => {
  const path = usePathname();

  const addRoute = path.endsWith('/content-manager/add');
  return (
    <>
      <Head>
        <title>Security Questions - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          heading="Content Management"
          content={<Typography variant="subtitle2">Manage your content and resources easily</Typography>}
          action={
            <Button
              href={addRoute ? '/content-manager' : '/content-manager/add'}
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={addRoute ? <FolderTwoToneIcon fontSize="small" /> : <AddTwoToneIcon fontSize="small" />}
            >
              {addRoute ? 'All Pages' : 'Add New Page'}
            </Button>
          }
        />
      </PageTitleWrapper>
    </>
  );
};

export default Index;
