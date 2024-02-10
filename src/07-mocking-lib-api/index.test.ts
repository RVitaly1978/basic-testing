// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn(fn => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const PATH = './data';
  const data = '123';
  const baseURL = 'https://jsonplaceholder.typicode.com';

  test('should create instance with provided base url', async () => {
    (axios as jest.Mocked<typeof axios>).create.mockReturnThis();
    (axios as jest.Mocked<typeof axios>).get.mockImplementation(async () => ({ data }));
    await throttledGetDataFromApi(PATH);
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    (axios as jest.Mocked<typeof axios>).create.mockReturnThis();
    (axios as jest.Mocked<typeof axios>).get.mockImplementation(async () => ({ data }));
    await throttledGetDataFromApi(PATH);
    expect(axios.get).toHaveBeenCalledWith(PATH);
  });

  test('should return response data', async () => {
    (axios as jest.Mocked<typeof axios>).create.mockReturnThis();
    (axios as jest.Mocked<typeof axios>).get.mockImplementation(async () => ({ data }));
    const result = await throttledGetDataFromApi(PATH);
    expect(result).toBe(data);
  });
});
