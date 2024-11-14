import { ACTION, API_ERROR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors } from '@/utils/helpers';

const getFaqList = async (action: ACTION) => {
  try {
    const { payload } = action;
    console.log('🚀 ~ getFaqList ~ payload:', payload);
    const response: ReturnType<any> = await api(`/api/admin/faq`, 'GET', { data: payload });
    return response.data;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const getFaq = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = api(`/api/admin/faq/${payload?.id}`, 'GET');
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const createFaq = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = api(`/api/admin/faq`, 'POST', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const updateFaq = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = api(`/api/admin/faq/${payload?.id}`, 'PUT', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const deleteFaq = async (action: ACTION) => {
  try {
    const { payload } = action;
    console.log('🚀 ~ deleteFaq ~ payload:', payload);
    const response: ReturnType<any> = api(`/api/admin/faq/${payload?.id}`, 'DELETE', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

export { getFaqList, getFaq, updateFaq, createFaq, deleteFaq };
