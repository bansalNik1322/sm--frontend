import { ACTION, API_ERROR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors } from '@/utils/helpers';

const getEmailTemplateList = async (action: ACTION) => {
  try {
    const { payload } = action;
    console.log('🚀 ~ getEmailTemplateList ~ payload:', payload);
    const response: ReturnType<any> = await api(
      `/api/admin/email?page=${payload?.page}&limit=${payload?.limit}`,
      'GET',
      { data: payload },
    );
    return response.data;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const getEmailTemplate = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = await api(`/api/admin/email/${payload?.id}`, 'GET');
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const createEmailTemplate = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = await api(`/api/admin/email`, 'POST', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const updateEmailTemplate = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = await api(`/api/admin/email/${payload?.slug}`, 'PUT', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const deleteEmailTemplate = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = await api(`/api/admin/email/${payload?.slug}`, 'DELETE', {});
    console.log('🚀 ~ deleteEmailTemplate ~ response:', response);
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

export { updateEmailTemplate, getEmailTemplateList, createEmailTemplate, deleteEmailTemplate, getEmailTemplate };
