import { ACTION, API_ERROR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors } from '@/utils/helpers';

export async function updateSettingsBranding(action: ACTION): Promise<unknown> {
  try {
    const { payload } = action;
    console.log('klg-8', payload?.formData);
    const res: ReturnType<any> = await api(`/api/settings/update`, 'POST', {
      data: payload?.formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
}
