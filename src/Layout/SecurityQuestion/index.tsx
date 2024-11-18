/* eslint-disable import/order */
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
import { DATATABLE_COLUMN } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';

import Footer from '../Container/Components/Footer';
import { useContainerContext } from '../Container/context';
import PageHeader from './Components/header';
import Table from './Table';

const columns: DATATABLE_COLUMN[] = [
  {
    dataField: 'question',
    text: 'Question',
  },
  {
    dataField: 'status',
    text: 'Status',
  },
  {
    dataField: 'createdAt',
    text: 'Created At (UTC)',
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

  const handleStatusChange = async (id: string, questionStatus: boolean) => {
    const confirmed = await showConfirmDialog('Are you sure to change Status!!');
    if (confirmed) {
      const { status, message } = (await request('updateSecurityQuestion', { id, status: questionStatus })) as {
        status: boolean;
        message: string;
      };
      if (status) {
        toastr('Question status has been updated Successfully', 'success');
      }
      toastr(message, 'error');
    }
  };

  const handleDelete = async (ids: string[]) => {
    const confirmed = await showConfirmDialog('Are you sure to Delete!!');
    if (confirmed) {
      console.log('🚀 ~ handleDelete ~ confirmed:', confirmed);
      const { status, message } = (await request('deleteSecurityQuestion', { id: ids[0] })) as {
        status: boolean;
        message: string;
      };
      console.log('🚀 ~ const{status,message}= ~ status:', status);
      if (status) {
        toastr('Question has been deleted Successfully', 'success');
      } else {
        toastr(message, 'error');
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/security-questions/${id}`);
  };

  const isLoading = useMemo(() => {
    return loading?.updateSecurityQuestion_LOADING || loading?.deleteSecurityQuestion_LOADING;
  }, [loading]);

  const getSecurityQuestionList = useMemo(
    () =>
      globalState?.getSecurityQuestionList?.result
        ? globalState.getSecurityQuestionList.result.map((item: any) => ({
            id: item._id,
            question: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.question}
              </Typography>
            ),
            status: (
              <Typography
                onClick={() => handleStatusChange(item?._id, !item?.status)}
                variant="body2"
                color="text.secondary"
                sx={{ cursor: 'pointer' }}
                noWrap
              >
                {item.status ? <Label color="success">Active</Label> : <Label color="error">Inactive</Label>}
              </Typography>
            ),
            createdAt: (
              <Typography variant="body2" color="text.secondary" noWrap>
                {moment.utc(item.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}
              </Typography>
            ),
            action: (
              <>
                <Tooltip title="Edit Record" arrow onClick={() => handleEdit(item?._id)}>
                  <IconButton
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
                    onClick={() => handleDelete([item?._id])}
                  >
                    <DeleteTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            ),
          }))
        : [],
    [globalState?.getSecurityQuestionList?.result],
  );

  return (
    <>
      <PageHeader />
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Table
              items={getSecurityQuestionList}
              columns={columns}
              api={{
                url: 'getSecurityQuestionList',
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
