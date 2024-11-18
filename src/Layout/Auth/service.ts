import { ACTION, API_ERROR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors, setHeader, toastr } from '@/utils/helpers';

/* Login User */
export async function LoginUser(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action;
    const res: ReturnType<any> = await api('/api/auth/login', 'POST', { data: payload });
    console.log('🚀 ~ LoginUser ~ res:', res);
    if (res?.data?.authTokens) {
      toastr('Login Successful', 'success', 'Login');
      setHeader(res.data.authTokens.accessToken, 'accessToken');
    }
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function forgotPassword(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action;
    const res: ReturnType<any> = await api('/api/auth/forgot-password', 'POST', { data: payload });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}

export async function resetPassword(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action;
    const res: ReturnType<any> = await api('/api/auth/reset-password', 'POST', { data: payload });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}
