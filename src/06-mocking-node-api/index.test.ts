// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const TIMEOUT = 1000;
    doStuffByTimeout(callback, TIMEOUT);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, TIMEOUT);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const TIMEOUT = 5000;
    doStuffByTimeout(callback, TIMEOUT);
    jest.advanceTimersByTime(TIMEOUT - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const INTERVAL = 5000;
    doStuffByInterval(callback, INTERVAL);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, INTERVAL);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const INTERVAL = 2000;
    const TIMES = 5;
    doStuffByInterval(callback, INTERVAL);
    jest.advanceTimersByTime(INTERVAL * TIMES);
    expect(callback).toHaveBeenCalledTimes(TIMES);
  });
});

describe('readFileAsynchronously', () => {
  const path = require('path');
  const fs = require('fs');
  const fsPromises = require('fs/promises');

  const PATH = './anyFile.ts';

  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join').mockReturnValueOnce(PATH);
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    await readFileAsynchronously(PATH);
    expect(path.join).toHaveBeenCalledWith(__dirname, PATH);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(path, 'join').mockReturnValueOnce(PATH);
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const content = await readFileAsynchronously(PATH);
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const CONTENT = 1;
    jest.spyOn(path, 'join').mockReturnValueOnce(PATH);
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fsPromises, 'readFile').mockReturnValueOnce(Promise.resolve(CONTENT));
    const content = await readFileAsynchronously(PATH);
    expect(content).toBe(String(CONTENT));
  });
});
