// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const PATH = './data';
  const data = '123'

  test('should create instance with provided base url', async () => {
    (axios as jest.Mocked<typeof axios>).create.mockReturnThis();
    (axios as jest.Mocked<typeof axios>).get.mockImplementation(async () => ({ data }));
    await throttledGetDataFromApi(PATH);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: 'https://jsonplaceholder.typicode.com' });
    throttledGetDataFromApi.cancel();
  });

  test('should perform request to correct provided url', async () => {
    (axios as jest.Mocked<typeof axios>).create.mockReturnThis();
    const fn = (axios as jest.Mocked<typeof axios>).get.mockImplementation(async () => ({ data }));
    await throttledGetDataFromApi(PATH);
    expect(fn).toHaveBeenCalledWith(PATH);
    throttledGetDataFromApi.cancel();
  });

  test('should return response data', async () => {
    (axios as jest.Mocked<typeof axios>).create.mockReturnThis();
    (axios as jest.Mocked<typeof axios>).get.mockImplementation(async () => ({ data }));
    const response = await throttledGetDataFromApi(PATH);
    expect(response).toBe(data);
    throttledGetDataFromApi.cancel();
  });
});
