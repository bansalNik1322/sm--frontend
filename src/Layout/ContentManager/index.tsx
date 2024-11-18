'use client';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Container, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { useRequest } from '@/components/App';
import { showConfirmDialog } from '@/components/Default/ConfirmDialoge';
import Label from '@/components/Default/Label';
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
    dataField: 'metaDescription',
    text: 'Meta Description',
  },
  {
    dataField: 'metaKeywords',
    text: 'Meta Keywords',
  },
  {
    dataField: 'description',
    text: 'Description',
  },
  {
    dataField: 'metaTitle',
    text: 'Meta Title',
  },
  {
    dataField: 'createdAt',
    text: 'Created At (UTC)',
  },
  {
    dataField: 'status',
    text: 'Status',
  },
  {
    dataField: 'action',
    text: 'Actions',
  },
];

function Index() {
  const router = useRouter();
  const theme = useTheme();
  const { state: globalState } = useContainerContext();
  const { request, loading } = useRequest();

  const handleStatusChange = async (slug: string, cmsStatus: boolean) => {
    const confirmed = await showConfirmDialog('Are you sure to change Status!!');
    if (confirmed) {
      const { status, message } = (await request('updateContentManager', { slug, active: cmsStatus })) as {
        status: boolean;
        message: string;
      };
      if (status) {
        toastr('CMS status has been updated Successfully', 'success');
      } else {
        toastr(message, 'error');
      }
    }
  };

  const handleDelete = async (slugs: string[]) => {
    const confirmed = await showConfirmDialog('Are you sure to Delete!!');
    if (confirmed) {
      console.log('🚀 ~ handleDelete ~ confirmed:', confirmed);
      const { status, message } = (await request('deleteContentManager', { slug: slugs[0] })) as {
        status: boolean;
        message: string;
      };

      if (status) {
        toastr('CMS has been deleted Successfully', 'success');
      } else {
        toastr(message, 'error');
      }
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/content-manager/${slug}`);
  };

  const isLoading = useMemo(() => {
    return loading?.updateContentManager_LOADING || loading?.deleteContentManager_LOADING;
  }, [loading]);

  const getContentManagerList = useMemo(
    () =>
      globalState?.getContentManagerList?.result
        ? globalState.getContentManagerList.result.map((item: any) => ({
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
            metaDescription: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.metaDescription}
              </Typography>
            ),
            metaKeywords: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.metaKeywords}
              </Typography>
            ),
            description: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.metaKeywords}
              </Typography>
            ),
            metaTitle: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.metaTitle}
              </Typography>
            ),
            createdAt: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {moment.utc(item.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}
              </Typography>
            ),
            status: (
              <Typography
                onClick={() => handleStatusChange(item?.slug, !item?.status)}
                variant="body2"
                color="text.secondary"
                sx={{ cursor: 'pointer' }}
                noWrap
              >
                {item.active ? <Label color="success">Active</Label> : <Label color="error">Inactive</Label>}
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
    [globalState?.getContentManagerList?.result],
  );

  return (
    <>
      <PageHeader />
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Table
              items={getContentManagerList}
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
}
export default Index;
