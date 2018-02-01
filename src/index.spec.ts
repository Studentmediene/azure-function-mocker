import { FunctionMocker, mockContext, mockRequest } from './index';

describe('azure-function-mocker', () => {

  it('Loads mockContext properly', async () => {
    expect(mockContext).toBeTruthy();
  });

  it('Loads mockRequest properly', async () => {
    expect(mockRequest).toBeTruthy();
  });

  it('Loads FunctionMocker properly', async () => {
    expect(FunctionMocker).toBeTruthy();
    expect(typeof new FunctionMocker(() => null).run).toEqual('function');
  });
});
