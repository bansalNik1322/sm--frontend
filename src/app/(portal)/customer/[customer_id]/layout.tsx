// Components
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import React from 'react';

import { SuspenseLoader } from '@/components/App/Loader';
import { CUSTOMER } from '@/Layout/Customer';
import { getCustomerDetail } from '@/Layout/CustomerDetail/service';
import { getDecodedToken } from '@/utils/helpers';

export const metadata: Metadata = {
  title: 'Customer Detail',
  description: 'Customer Detail',
};
// Components

const CustomerDetail = dynamic(() => import('@/Layout/CustomerDetail'), {
  loading: () => <SuspenseLoader />,
  ssr: false,
});

async function fetchCustomerDetail(customerId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');
  const { isValid } = getDecodedToken(token?.value as unknown as string);
  if (!isValid) return;

  const customerDetail = (await getCustomerDetail(
    {
      payload: {
        id: customerId,
      },
    },
    token?.value as string,
  )) as CUSTOMER;

  return customerDetail;
}

const Layout = async ({ children, params }: { children: React.ReactNode; params: { customer_id: string } }) => {
  const customerDetail = await fetchCustomerDetail(params.customer_id);
  if (!customerDetail) return;
  return <CustomerDetail customerDetail={customerDetail}>{children}</CustomerDetail>;
};

export default Layout;
