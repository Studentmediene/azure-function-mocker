import { mockRequest } from './index';

describe('mockRequest()', () => {
  it('contains required keys', () => {
    const {
      method,
      query,
      params,
      url,
      originalUrl,
      headers,
    } = mockRequest();

    expect(method).toBeTruthy();
    expect(typeof method).toBe('string');

    expect(query).toBeTruthy();
    expect(typeof query).toBe('object');

    expect(params).toBeTruthy();
    expect(typeof params).toBe('object');

    expect(url).toBeTruthy();
    expect(typeof url).toBe('string');

    expect(originalUrl).toBeTruthy();
    expect(typeof originalUrl).toBe('string');

    expect(headers).toBeTruthy();
    expect(typeof headers).toBe('object');
  });

  it('Uses default `method` GET when not specified', () => {
    const req = mockRequest();

    expect(req.method).toBeTruthy();
    expect(req.method).toEqual('GET');
  });

  it('Contains empty query when not specified', () => {
    expect(mockRequest().query).toEqual({});
  });

  it('Actual query equals expected query', () => {
    const expected = { isbn: 'hello world' };
    const actual = mockRequest('GET', {}, expected).query;

    expect(actual).toEqual(expected);
  });

  it('Contains empty params when not specified', () => {
    expect(mockRequest().params).toEqual({});
  });

  it('Actual params equals expected params', () => {
    const expected = { isbn: 'hello world' };
    const actual = mockRequest('GET', expected, {}).params;

    expect(actual).toEqual(expected);
  });

  it('Uses method `POST` when provided as argument', () => {
    const method = 'POST';
    const req = mockRequest(method);

    expect(req.method).toBe(method);
  });

});
