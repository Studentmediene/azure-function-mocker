import MockedResponse from './mockedResponse';

/**
 * Mocks middlewares and presents it in a Promise
 * to the tester.
 */
export default class MiddlewareMocker {
  public middleware: (req: any, res: any, next: any) => any;
  /**
   * @param middleware Middleware function, accepts args req:Request,
   *                   res:Response and next:(err = null) => void
   */
  constructor(middleware: (req: any, res: any, next: any) => any) {
    this.middleware = middleware;
  }

  /**
   * Calls the Middleware with the given request and response objects,
   * and listens for the next() function to be called, which triggers the promise
   * to resolve or reject
   * @param req
   * @param res
   */
  public run(req: object, res: MockedResponse): Promise<any> {
    if (!req) {
      return Promise.reject(new ReferenceError('Missing required parameter `req`'));
    }

    if (!res) {
      return Promise.reject(new ReferenceError('Missing required parameter `res`'));
    }

    if (!(res instanceof MockedResponse)) {
      return Promise.reject(
        new TypeError(`Expected parameter 'res' to be of type MockedResponse, instead got: ${res.constructor}`),
      );
    }

    return new Promise((rsv, rr) => {
      const nextCalledHandler = this._mockNext((err?: Error) => {
        if (err) {
          return rr(err);
        }

        return rsv({ req, res });
      });

      res.send = this._mockNext(() => rsv({ req, res }));

      try {
        this.middleware(req, res, nextCalledHandler);
      } catch (e) {
        return rr(e);
      }
    });
  }

  private _mockSend(cb: () => void, res: MockedResponse): (body: any) => void {
    return (body: any): void => {
      res._data = body;
      cb();
    };
  }

  /**
   * Mocks the next function, and calls the callback function
   * when next has been called.
   * @param {Function} callback Callback function of type (err = null) => void
   * @return {Function} next
   */
  private _mockNext(callback: (err?: Error) => any) {
    return (err?: Error) => {
      callback(err);
    };
  }
}