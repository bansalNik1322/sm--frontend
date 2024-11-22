import { ACTION, API_ERROR } from '@/types/interfaces';
import { api } from '@/utils/axiosInterceptor';
import { handleErrors } from '@/utils/helpers';

const getUserChatList = async (action: ACTION) => {
  try {
    const { payload } = action;
    const response: ReturnType<any> = await api(`/api/chat/user-chats`, 'GET');
    return response.data;
  } catch (error) {
    return handleErrors(error as API_ERROR);
  }
};

export { getUserChatList };
