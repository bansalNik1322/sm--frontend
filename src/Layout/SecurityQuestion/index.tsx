'use client';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Container, Grid, Typography } from '@mui/material';
import { subDays } from 'date-fns';
import Head from 'next/head';

import PageHeader from '@/components/Default/PageHeader';
import PageTitleWrapper from '@/components/Default/PageTitleWrapper';
import { DATATABLE_COLUMN } from '@/types/interfaces';

import Table from './Table';

type CryptoOrderStatus = 'completed' | 'pending' | 'failed';
interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
const columns: DATATABLE_COLUMN[] = [
  {
    dataField: 'id',
    text: 'ID',
  },
  {
    dataField: 'status',
    text: 'Status',
    type:'label'
  },
  {
    dataField: 'orderDetails',
    hidden: true,
    text: 'Order Details',
  },
  {
    dataField: 'orderDate',
    text: 'Order Date',
  },
  {
    dataField: 'orderID',
    text: 'Order ID',
  },
  {
    dataField: 'sourceName',
    text: 'Source Name',
  },
  {
    dataField: 'sourceDesc',
    text: 'Source Description',
  },
  {
    dataField: 'amountCrypto',
    text: 'Amount (Crypto)',
  },
  {
    dataField: 'amount',
    text: 'Amount (Currency)',
  },
  {
    dataField: 'cryptoCurrency',
    text: 'Cryptocurrency',
  },
  {
    dataField: 'currency',
    text: 'Currency',
  },
];

const cryptoOrders: CryptoOrder[] = [
  {
    id: '1',
    orderDetails: 'Fiat Deposit',
    orderDate: new Date().getTime(),
    status: 'completed',
    orderID: 'VUVX709ET7BY',
    sourceName: 'Bank Account',
    sourceDesc: '*** 1111',
    amountCrypto: 34.4565,
    amount: 56787,
    cryptoCurrency: 'ETH',
    currency: '$',
  },
  {
    id: '2',
    orderDetails: 'Fiat Deposit',
    orderDate: subDays(new Date(), 1).getTime(),
    status: 'completed',
    orderID: '23M3UOG65G8K',
    sourceName: 'Bank Account',
    sourceDesc: '*** 1111',
    amountCrypto: 6.58454334,
    amount: 8734587,
    cryptoCurrency: 'BTC',
    currency: '$',
  },
  {
    id: '3',
    orderDetails: 'Fiat Deposit',
    orderDate: subDays(new Date(), 5).getTime(),
    status: 'failed',
    orderID: 'F6JHK65MS818',
    sourceName: 'Bank Account',
    sourceDesc: '*** 1111',
    amountCrypto: 6.58454334,
    amount: 8734587,
    cryptoCurrency: 'BTC',
    currency: '$',
  },
  {
    id: '4',
    orderDetails: 'Fiat Deposit',
    orderDate: subDays(new Date(), 55).getTime(),
    status: 'completed',
    orderID: 'QJFAI7N84LGM',
    sourceName: 'Bank Account',
    sourceDesc: '*** 1111',
    amountCrypto: 6.58454334,
    amount: 8734587,
    cryptoCurrency: 'BTC',
    currency: '$',
  },
  {
    id: '5',
    orderDetails: 'Fiat Deposit',
    orderDate: subDays(new Date(), 56).getTime(),
    status: 'pending',
    orderID: 'BO5KFSYGC0YW',
    sourceName: 'Bank Account',
    sourceDesc: '*** 1111',
    amountCrypto: 6.58454334,
    amount: 8734587,
    cryptoCurrency: 'BTC',
    currency: '$',
  },
  {
    id: '6',
    orderDetails: 'Fiat Deposit',
    orderDate: subDays(new Date(), 33).getTime(),
    status: 'completed',
    orderID: '6RS606CBMKVQ',
    sourceName: 'Bank Account',
    sourceDesc: '*** 1111',
    amountCrypto: 6.58454334,
    amount: 8734587,
    cryptoCurrency: 'BTC',
    currency: '$',
  },
  {
    id: '7',
    orderDetails: 'Fiat Deposit',
    orderDate: new Date().getTime(),
    status: 'pending',
    orderID: '479KUYHOBMJS',
    sourceName: 'Bank Account',
    sourceDesc: '*** 1212',
    amountCrypto: 2.346546,
    amount: 234234,
    cryptoCurrency: 'BTC',
    currency: '$',
  },
  {
    id: '8',
    orderDetails: 'Paypal Withdraw',
    orderDate: subDays(new Date(), 22).getTime(),
    status: 'completed',
    orderID: 'W67CFZNT71KR',
    sourceName: 'Paypal Account',
    sourceDesc: '*** 1111',
    amountCrypto: 3.345456,
    amount: 34544,
    cryptoCurrency: 'BTC',
    currency: '$',
  },
  {
    id: '9',
    orderDetails: 'Fiat Deposit',
    orderDate: subDays(new Date(), 11).getTime(),
    status: 'completed',
    orderID: '63GJ5DJFKS4H',
    sourceName: 'Bank Account',
    sourceDesc: '*** 2222',
    amountCrypto: 1.4389567945,
    amount: 123843,
    cryptoCurrency: 'BTC',
    currency: '$',
  },
  {
    id: '10',
    orderDetails: 'Wallet Transfer',
    orderDate: subDays(new Date(), 123).getTime(),
    status: 'failed',
    orderID: '17KRZHY8T05M',
    sourceName: 'Wallet Transfer',
    sourceDesc: "John's Cardano Wallet",
    amountCrypto: 765.5695,
    amount: 7567,
    cryptoCurrency: 'ADA',
    currency: '$',
  },
];
function Index() {
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
            <Table items={cryptoOrders} columns={columns} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Index;
