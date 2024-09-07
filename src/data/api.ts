import axios, { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { SaveDataResponsePayload, SaveDataRequestPayload } from "../types";
import { app } from "../config";

/**
 * Mocks all app endpoints to fake data
 * @returns {void}
 */
export const mockApi = () => {
  const mock = new MockAdapter(axios);
  const responses = {
    success: { success: true },
    error: {
      success: false,
      error: "500 Internal Server Error: couldn't save the data",
    },
  };
  const currentResponse = app.emulateSuccessResponse
    ? responses["success"]
    : responses["error"];

  mock.onPost("/manage/settings/general/save-gdpr").reply(200, currentResponse);
  mock
    .onPost("/manage/settings/general/save-strong-password")
    .reply(200, currentResponse);
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
    console.error("Error saving data to API:", error);
    errorCallback(error instanceof Error ? error.message : (error as string));
    return false;
  }
};
