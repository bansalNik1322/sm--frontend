/* eslint-disable import/order */
'use client';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Container, Grid, Typography } from '@mui/material';
import moment from 'moment';
import Head from 'next/head';
import { useMemo } from 'react';

import { useRequest } from '@/components/App';
import { showConfirmDialog } from '@/components/Default/ConfirmDialoge';
import Label from '@/components/Default/Label';
import PageHeader from '@/components/Default/PageHeader';
import PageTitleWrapper from '@/components/Default/PageTitleWrapper';
import { DATATABLE_COLUMN } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';

import { useContainerContext } from '../Container/context';
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
];

function Index() {
  const { state: globalState } = useContainerContext();
  const { request, loading } = useRequest();

  const handleStatusChange = async (id: string, questionStatus: boolean) => {
    const confirmed = await showConfirmDialog('Are you sure to change Status!!');
    if (confirmed) {
      const { status } = (await request('updateSecurityQuestion', { id, status: questionStatus })) as {
        status: boolean;
      };
      if (status) {
        toastr('Question status has been updated Successfully', 'success');
      }
    }
  };

  const isLoading = useMemo(() => {
    return loading?.updateSecurityQuestion_LOADING;
  }, [loading]);

  const getSecurityQuestionList = useMemo(
    () =>
      globalState?.getSecurityQuestionList?.result
        ? globalState.getSecurityQuestionList.result.map((item: any) => ({
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
          }))
        : [],
    [globalState?.getSecurityQuestionList?.result],
  );

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
            <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained" startIcon={<AddTwoToneIcon fontSize="small" />}>
              Add Security Question
            </Button>
          }
        />
      </PageTitleWrapper>

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
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Index;
