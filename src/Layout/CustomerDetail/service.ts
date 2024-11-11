import { ACTION } from '@/types/interfaces';

// Server Side Rendering
/**
 *
 * @param action Request payload
 * @returns Users List
 */
export async function getCustomerDetail(action: ACTION, token: string): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await fetch(`${process.env.BACKEND}/v1/api/customer/get-details/${payload?.id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return res?.json();
}
