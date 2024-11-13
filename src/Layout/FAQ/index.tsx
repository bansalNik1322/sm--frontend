/* eslint-disable @typescript-eslint/ban-types */
'use client';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Card, CardContent, CardHeader, Container, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Head from 'next/head';
import { ChangeEvent, useState } from 'react';

import DefaultAccordion from '@/components/Default/Accordian';
import AccordionList from '@/components/Default/AccordionList';
import PageHeader from '@/components/Default/PageHeader';
import PageTitleWrapper from '@/components/Default/PageTitleWrapper';
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
  const [currentTab, setCurrentTab] = useState<string>('account_management');
  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>FAQs</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          heading="FAQs"
          content={<Typography variant="subtitle2">Manage your FAQs</Typography>}
          action={
            <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained" startIcon={<AddTwoToneIcon fontSize="small" />}>
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
              <CardHeader title="Hey, How Are You" />
              <Divider
                sx={{
                  mt: theme.spacing(1),
                  mx: theme.spacing(2),
                  background: theme.colors.alpha.trueWhite[50],
                }}
              />
              <CardContent>
                <AccordionList
                  data={[
                    { title: 'First Title', content: 'Here is the content' },
                    { title: 'First Title', content: 'Here is the content' },
                    { title: 'First Title', content: 'Here is the content' },
                    { title: 'First Title', content: 'Here is the content' },
                  ]}
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
