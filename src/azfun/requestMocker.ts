export interface MockedRequest {
  method: string;
  query: any;
  params: any;
  url: string;
  originalUrl: string;
  headers: any;
  body: any;
  rawBody: any;
}

/**
 * Mocks an Azure Request
 * @param {string} method Http method (GET, POST, PUT, PATCH, DELETE, HEAD, OPTION)
 * @param {object} params Url parameters. Usually described in function.json
 * @param {object} query
 * @param {object} headers
 * @return {object}
 */
export const mockRequest: any = (method = 'GET', params = {}, query = {}, headers = undefined) => {
  return {
    method,
    params,
    query,
    body: undefined,
    headers: headers || {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate',
      'cache-control': 'no-cache',
      connection: 'keep-alive',
      host: 'localhost:7071',
      'postman-token': '13104b4e-1965-4e9c-a1f1-97c49d9bf148',
      'user-agent': 'PostmanRuntime/7.1.1',
    },
    originalUrl: '/api/v1/books',
    rawBody: undefined,
    url: '/api/v1/books',
  };
};
