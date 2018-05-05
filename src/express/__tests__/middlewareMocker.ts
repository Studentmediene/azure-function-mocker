import MiddlewareMocker from '../middlewareMocker';
import MockedResponse from '../mockedResponse';

describe('MiddlewareMocker', () => {
  let mockedSimpleMiddleware: (req: any, res: any, next: any) => any;

  beforeEach(() => {
    mockedSimpleMiddleware = (req, res, next) => { next(); };
  });

  it('should bind middleware to <instance>.middleware', () => {
    const mocked = new MiddlewareMocker(mockedSimpleMiddleware);

    expect(mocked.middleware).toEqual(mockedSimpleMiddleware);
  });
});

describe('MiddlewareMocker.run', () => {
  let mockedSimpleFunction;
  let mockedMiddleware: MiddlewareMocker;

  let mockedRequest: any;

  beforeEach(() => {
    mockedSimpleFunction = (req: any, res: any, next: any) => next();
    mockedMiddleware = new MiddlewareMocker(mockedSimpleFunction);

    mockedRequest = {
      body: {
        name: 'Jon Snow',
      },
    };
  });

  it('should throw ReferenceError if request param is missing', async () => {
    // Ignore complaint about type here, we still need the test
    await expect(mockedMiddleware.run(null, null)).rejects.toBeInstanceOf(ReferenceError);
  });

  it('should give fitting error message if request param is missing', async () => {
    // Ignore complaint about type here, we still need the test
    await expect(mockedMiddleware.run(null, null)).rejects.toMatchSnapshot();
  });

  it('should throw ReferenceError if response param is missing', async () => {
    // Ignore complaint about type here, we still need the test
    await expect(mockedMiddleware.run(mockedRequest, null)).rejects.toBeInstanceOf(ReferenceError);
  });

  it('should give fitting error message if response param is missing', async () => {
    // Ignore complaint about type here, we still need the test
    await expect(mockedMiddleware.run(mockedRequest, null)).rejects.toMatchSnapshot();
  });

  it('should throw TypeError if response is not instance of MockedResponse', async () => {
    // Ignore complaint about type here, we still need the test
    await expect(mockedMiddleware.run(mockedRequest, { test: 'test' })).rejects.toBeInstanceOf(TypeError);
  });

  it('should give fitting error message if response is not instance of MockedResponse', async () => {
    // Ignore complaint about type here, we still need the test
    await expect(mockedMiddleware.run(mockedRequest, { test: 'test' })).rejects.toMatchSnapshot();
  });

  it('should resolve if middleware completes successfully', async () => {
    await expect(mockedMiddleware.run(mockedRequest, new MockedResponse())).resolves.toBeTruthy();
  });

  /**
   * Calling next() with an error message is not a fataly failuire.
   * Instead this tests that the MiddlewareMocker catches uncatched errors
   * in the middleware. Which might result in 500 errors.
   */
  it('should fail if middleware fataly-fails', async () => {
    const expectedErr = new ReferenceError('Some error');
    mockedMiddleware = new MiddlewareMocker(() => { throw expectedErr; });

    await expect(mockedMiddleware.run(mockedRequest, new MockedResponse()))
      .rejects
      .toBeInstanceOf(ReferenceError);
  });
});
