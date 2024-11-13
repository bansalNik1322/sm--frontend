import { ACTION, API_ERROR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors } from '@/utils/helpers';

const getSecurityQuestionList = async (action: ACTION) => {
  try {
    const { payload } = action;
    console.log('🚀 ~ getSecurityQuestionList ~ payload:', payload);
    const response: ReturnType<any> = await api(`/api/admin/security-question`, 'GET', { data: payload });
    console.log('🚀 ~ getSecurityQuestionList ~ response:', response);
    return response.data;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const getSecurityQuestion = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = api(`/api/admin/security-question/${payload?.id}`, 'GET');
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const createSecurityQuestion = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = api(`/api/admin/security-question`, 'POST', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const updateSecurityQuestion = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = api(`/api/admin/security-question/${payload?.id}`, 'PUT', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const deleteSecurityQuestion = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = api(`/api/admin/security-question/${payload?.id}`, 'DELETE', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

export {
  updateSecurityQuestion,
  getSecurityQuestionList,
  createSecurityQuestion,
  deleteSecurityQuestion,
  getSecurityQuestion,
};
