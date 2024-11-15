/* eslint-disable @typescript-eslint/ban-types */
'use client';

import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment';
import Head from 'next/head';
import { ChangeEvent, useMemo, useState } from 'react';

import { useRequest } from '@/components/App';
import AccordionList from '@/components/Default/AccordionList';
import { showConfirmDialog } from '@/components/Default/ConfirmDialoge';
import PageHeader from '@/components/Default/PageHeader';
import PageTitleWrapper from '@/components/Default/PageTitleWrapper';
import { toastr } from '@/utils/helpers';

import { useContainerContext } from '../Container/context';
const TabsWrapper = styled(Tabs)(
  () => `
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }
  `,
);

const tabs = [
  { value: 'account_management', label: 'Account Management' },
  { value: 'troubleshooting', label: 'Troubleshooting / Common Issues' },
  { value: 'policies', label: 'Policies and Security' },
  { value: 'security', label: 'Passwords/Security' },
  { value: 'others', label: 'Other' },
];

const Index = () => {
  const theme = useTheme();
  const router = useRouter();
  const { state: globalState } = useContainerContext();
  const { request, loading } = useRequest();
  const [currentTab, setCurrentTab] = useState<string>('account_management');

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const isLoading = useMemo(() => {
    return loading?.deleteFaq_LOADING;
  }, [loading]);

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirmDialog('Are you sure you want to delete?');
    if (confirmed) {
      const { status, message } = (await request('deleteFaq', { id })) as {
        status: boolean;
        message: string;
      };
      if (status) {
        toastr('FAQ has been Deleted Successfully', 'success');
        return;
      }
      toastr(message, 'error');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/faqs/${id}`);
  };

  const getFaqList = useMemo(
    () =>
      globalState?.getFaqList?.result
        ? globalState?.getFaqList?.result?.map((item: any) => ({
            title: item?.question,
            content: (
              <Box>
                <Typography>{item?.answer}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10px',
                  }}
                >
                  <Typography>{moment.utc(item.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}</Typography>
                  <Box>
                    <Tooltip arrow title="Edit" onClick={() => handleEdit(item?._id)}>
                      <IconButton
                        aria-label="edit"
                        size="large"
                        sx={{
                          '&:hover': {
                            backgroundColor: 'inherit',
                          },
                        }}
                      >
                        <BorderColorOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Delete">
                      <IconButton
                        onClick={() => handleDelete(item?._id)}
                        aria-label="delete"
                        sx={{
                          '&:hover': {
                            backgroundColor: 'inherit',
                          },
                        }}
                        size="large"
                      >
                        <DeleteOutlineOutlined sx={{ color: 'red' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            ),
          }))
        : [],
    [globalState?.getFaqList?.result, currentTab, handleDelete],
  );

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
              href="/faqs/add"
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Add FAQ
            </Button>
          }
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              sx={{
                '& .MuiButtonBase-root': {
                  fontWeight: 'lighter',
                  fontSize: '19px',
                },
              }}
            >
              {tabs.map(tab => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                '& .MuiCardHeader-root .MuiCardHeader-title ': {
                  fontSize: '21px',
                },
              }}
            >
              <CardHeader title={`Frequently asked questions related to ${currentTab}`} />
              <Divider
                sx={{
                  mt: theme.spacing(1),
                  mx: theme.spacing(2),
                  background: theme.colors.alpha.trueWhite[50],
                }}
              />
              <CardContent>
                <AccordionList
                  data={getFaqList}
                  api={{
                    url: 'getFaqList',
                  }}
                  loading={Boolean(isLoading)}
                  accordionTab={currentTab}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Index;
