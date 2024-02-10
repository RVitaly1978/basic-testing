// Uncomment the code below and write your tests
import lodash from 'lodash';
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError, BankAccount } from '.';

describe('BankAccount', () => {
  let Account: BankAccount;
  let AccountTo: BankAccount;
  const balance = 100;

  beforeEach(() => {
    Account = getBankAccount(balance);
    AccountTo = getBankAccount(0);
  })

  test('should create account with initial balance', () => {
    expect(Account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect.assertions(1);
    expect(() => Account.withdraw(balance + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect.assertions(1);
    expect(() => Account.transfer(balance + 1, AccountTo)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect.assertions(1);
    expect(() => Account.transfer(balance - 1, Account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    Account.deposit(balance);
    expect(Account.getBalance()).toBe(balance * 2);
  });

  test('should withdraw money', () => {
    Account.withdraw(0.25 * balance);
    expect(Account.getBalance()).toBe(0.75 * balance);
  });

  test('should transfer money', () => {
    Account.transfer(0.25 * balance, AccountTo);
    expect(Account.getBalance()).toBe(0.75 * balance);
    expect(AccountTo.getBalance()).toBe(0.25 * balance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const value = 75;
    jest.spyOn(lodash, 'random').mockReturnValueOnce(value).mockReturnValueOnce(1);
    const balance = await Account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(value);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const value = 75;
    jest.spyOn(Account, 'fetchBalance').mockReturnValueOnce(Promise.resolve(value));
    await Account.synchronizeBalance();
    expect(Account.getBalance()).toBe(value);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);
    jest.spyOn(Account, 'fetchBalance').mockReturnValueOnce(Promise.resolve(null));
    await expect(Account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
