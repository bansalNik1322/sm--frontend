import { ACTION } from '@/types/interfaces';

// Server Side Rendering
/**
 *
 * @param action Request payload
 * @returns Users List
 */
export async function getProfileDetail(action: ACTION, token: string): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await fetch(`${process.env.BACKEND}/v1/api/user/get-details/${payload?.id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return res?.json();
}

/**
 *
 * @param action Request payload
 * @returns Users List
 */
export async function getSettingsDetail(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await fetch(`${process.env.BACKEND}/v1/api/settings/get-details/${payload?.model}`, {
    method: 'GET',
    cache: 'no-store',
  });
  return res?.json();
}
