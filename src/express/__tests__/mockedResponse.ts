import MockedResponse from '../mockedResponse';

describe('MockedResponse', () => {
  let res: MockedResponse;

  beforeEach(() => {
    res = new MockedResponse();
  });

  it('should default status code to 200', () => {
    expect(res.code).toEqual(200);
  });

  it('changes status-code to 418', () => {
    res.status(418);

    expect(res.code).toEqual(418);
  });

  it('should set content-type to application/json if response body is object', () => {
    res.send({ messsage: 'hello world' });

    expect(res.headers['content-type']).toEqual('application/json');
  });

  it('should use default content-type if body is string', () => {
    const expected = 'text/plain';
    res.headers['content-type'] = expected;

    res.send('hello world');

    expect(res.headers['content-type']).toEqual(expected);
  });

  it('stores response body in property data', () => {
    const expected = { message: 'hello world' };
    res.send(expected);

    expect(res.data).toEqual(expected);
  });
});
