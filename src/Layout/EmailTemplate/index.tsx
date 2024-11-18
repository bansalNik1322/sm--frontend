'use client';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Container, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';

import { useRequest } from '@/components/App';
import { showConfirmDialog } from '@/components/Default/ConfirmDialoge';
import Table from '@/Layout/SecurityQuestion/Table';
import { DATATABLE_COLUMN } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';

import Footer from '../Container/Components/Footer';
import { useContainerContext } from '../Container/context';
import PageHeader from './Components/header';

const columns: DATATABLE_COLUMN[] = [
  {
    dataField: 'title',
    text: 'Title',
  },
  {
    dataField: 'slug',
    text: 'Slug',
  },
  {
    dataField: 'subject',
    text: 'Subject',
  },
  {
    dataField: 'createdAt',
    text: 'Date (ITC)',
  },
  {
    dataField: 'action',
    text: 'Actions',
  },
];

const Index: FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const { state: globalState } = useContainerContext();
  const { request, loading } = useRequest();

  const handleEdit = (slug: string) => {
    router.push(`/email-template/${slug}`);
  };

  const getEmailTemplateList = useMemo(
    () =>
      globalState?.getEmailTemplateList?.result
        ? globalState.getEmailTemplateList.result.map((item: any) => ({
            id: item.slug,
            title: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.title}
              </Typography>
            ),
            slug: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.slug}
              </Typography>
            ),
            subject: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.metaDescription}
              </Typography>
            ),
            createdAt: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {moment.utc(item.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}
              </Typography>
            ),
            action: (
              <>
                <Tooltip title="Edit Record" arrow>
                  <IconButton
                    onClick={() => handleEdit(item?.slug)}
                    sx={{
                      '&:hover': {
                        background: theme.colors.primary.lighter,
                      },
                      color: theme.palette.primary.main,
                    }}
                    color="inherit"
                    size="small"
                  >
                    <EditTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Record" arrow>
                  <IconButton
                    sx={{
                      '&:hover': { background: theme.colors.error.lighter },
                      color: theme.palette.error.main,
                    }}
                    color="inherit"
                    size="small"
                    onClick={() => handleDelete([item?.slug])}
                  >
                    <DeleteTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            ),
          }))
        : [],
    [globalState?.getEmailTemplateList?.result],
  );

  const isLoading = useMemo(() => {
    return loading?.updateContentManager_LOADING || loading?.deleteContentManager_LOADING;
  }, [loading]);

  const handleDelete = async (slugs: string[]) => {
    const confirmed = await showConfirmDialog('Are you sure to Delete!!');
    if (confirmed) {
      const { status, message } = (await request('deleteEmailTemplate', { slug: slugs[0] })) as {
        status: boolean;
        message: string;
      };

      if (status) {
        toastr('Email Template has been deleted Successfully', 'success');
      } else {
        toastr(message, 'error');
      }
    }
  };

  return (
    <>
      <PageHeader />

      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Table
              items={getEmailTemplateList}
              columns={columns}
              api={{
                url: 'getContentManagerList',
              }}
              loading={Boolean(isLoading)}
              action={{
                handleDelete: handleDelete,
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Index;
