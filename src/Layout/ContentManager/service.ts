import { ACTION, API_ERROR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors } from '@/utils/helpers';

const getContentManagerList = async (action: ACTION) => {
  try {
    const { payload } = action;
    console.log("🚀 ~ getContentManagerList ~ payload:", payload)
    const response: ReturnType<any> = await api(
      `/api/admin/content-manager?page=${payload?.page}&limit=${payload?.limit}`,
      'GET',
      { data: payload },
    );
    return response.data;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const getContentManager = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = await api(`/api/admin/content-manager/${payload?.id}`, 'GET');
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const createContentManager = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = await api(`/api/admin/content-manager`, 'POST', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const updateContentManager = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = await api(`/api/admin/content-manager/${payload?.slug}`, 'PUT', {
      data: payload,
    });
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

const deleteContentManager = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = await api(`/api/admin/content-manager/${payload?.slug}`, 'DELETE', {});
    console.log('🚀 ~ deleteContentManager ~ response:', response);
    return response;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

export {
  updateContentManager,
  getContentManagerList,
  createContentManager,
  deleteContentManager,
  getContentManager,
};
