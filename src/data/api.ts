import axios, { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { SaveDataResponsePayload, SaveDataRequestPayload } from "../types";

/**
 * Mocks all app endpoints to fake data
 * @returns {void}
 */
export const mockApi = () => {
  const mock = new MockAdapter(axios);

  mock
    .onPost("/manage/settings/general/save-gdpr")
    .reply(200, { success: true });
  mock
    .onPost("/manage/settings/general/save-strong-password")
    .reply(200, { success: true });
};

/**
 * Saves data to API
 * @param {string} url - url of the endpoint
 * @param {SaveDataRequestPayload} payload - request payload
 * @param {(error: string) => void} errorCallback - error callback in case of server issue
 * @returns {Promise<boolean>}
 */
export const saveDataToApi = async (
  url: string,
  payload: SaveDataRequestPayload,
  errorCallback: (error: string) => void,
): Promise<boolean> => {
  try {
    const { data } = await axios.post<
      SaveDataResponsePayload,
      AxiosResponse<SaveDataResponsePayload>
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
