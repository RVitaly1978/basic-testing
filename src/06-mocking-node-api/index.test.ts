// Uncomment the code below and write your tests
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  const TIMEOUT = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, TIMEOUT);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(cb, TIMEOUT);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, TIMEOUT);
    jest.advanceTimersByTime(TIMEOUT - 1);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const INTERVAL = 2000;
  const TIMES = 5;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, INTERVAL);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(cb, INTERVAL);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, INTERVAL);
    jest.advanceTimersByTime(INTERVAL * TIMES);
    expect(cb).toHaveBeenCalledTimes(TIMES);
  });
});

describe('readFileAsynchronously', () => {
  const PATH = './anyFile.ts';
  const CONTENT = '1';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(PATH);
    expect(join).toHaveBeenCalledWith(__dirname, PATH);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const content = await readFileAsynchronously(PATH);
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(CONTENT);
    const content = await readFileAsynchronously(PATH);
    expect(content).toBe(String(CONTENT));
  });
});
