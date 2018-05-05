import { azfun, express } from './index';

describe('azfun', () => {

  it('Loads mockContext properly', async () => {
    expect(azfun.mockContext).toBeTruthy();
  });

  it('Loads mockRequest properly', async () => {
    expect(azfun.mockRequest).toBeTruthy();
  });

  it('Loads FunctionMocker properly', async () => {
    expect(azfun.FunctionMocker).toBeTruthy();
    expect(typeof new azfun.FunctionMocker(() => null).run).toEqual('function');
  });
});

describe('express', () => {
  it('Loads MiddlewareMocker properly', () => {
    expect(new express.MiddlewareMocker(() => null)).toBeTruthy();
    expect(typeof new express.MiddlewareMocker(() => null).run).toEqual('function');
  });

  it('Loads MockedResponse properly', () => {
    expect(new express.MockedResponse()).toBeTruthy();
  });
});
