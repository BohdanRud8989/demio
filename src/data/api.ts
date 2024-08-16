import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { FormValues, SaveDataResponse } from '../types/types';

export const mockApi = () => {
  const mock = new MockAdapter(axios);

  mock
      .onPost('/manage/settings/general/save-gdpr')
      .reply(200, { success: true });
  mock
      .onPost('/manage/settings/general/save-strong-password')
      .reply(200, { success: true });
};

export const saveDataToApi = async (
    url: string,
    payload: Partial<FormValues> & {
      sessionTime?: number;
      engagementPercentage?: string;
    },
    errorCallback: (error: string) => void
): Promise<boolean> => {
  try {
    const { data } = await axios.post<
        SaveDataResponse,
        AxiosResponse<SaveDataResponse>
        >(url, payload);
    const { success, error } = data;
    if (!success) {
      throw new Error(error);
    } else {
      return true;
    }
  } catch (error) {
    errorCallback(error instanceof Error ? error.message : (error as string));
    return false;
  }
};
