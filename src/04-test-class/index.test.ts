// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError, BankAccount } from '.';

describe('BankAccount', () => {
  let Account: BankAccount;
  let AccountTo: BankAccount;

  beforeEach(() => {
    Account = getBankAccount(100);
    AccountTo = getBankAccount(0);
  })

  test('should create account with initial balance', () => {
    expect(Account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect.assertions(1);
    const Account = getBankAccount(100);
    expect(() => Account.withdraw(101)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect.assertions(1);
    expect(() => Account.transfer(101, AccountTo)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect.assertions(1);
    expect(() => Account.transfer(50, Account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    Account.deposit(50);
    expect(Account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    Account.withdraw(25);
    expect(Account.getBalance()).toBe(75);
  });

  test('should transfer money', () => {
    Account.transfer(30, AccountTo);
    expect(Account.getBalance()).toBe(70);
    expect(AccountTo.getBalance()).toBe(30);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const lodash = require('lodash');
    jest.spyOn(lodash, 'random').mockReturnValueOnce(100).mockReturnValueOnce(1);
    const balance = await Account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(Account, 'fetchBalance').mockReturnValueOnce(Promise.resolve(1000));
    await Account.synchronizeBalance();
    expect(Account.getBalance()).toBe(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);
    jest.spyOn(Account, 'fetchBalance').mockReturnValueOnce(Promise.resolve(null));
    await expect(Account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
