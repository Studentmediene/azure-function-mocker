
export class ContextHandlerFunction extends Function {}

/* istanbul ignore next */
export interface MockedContext {
  bindings: object;
  // tslint:disable-next-line
  done: Function;
  log: object;
  res: Response;
}
export interface Response {
  status: number;
  body: object|any;
}

/**
 * Mocks an Azure Context object.
 * @param {function} handler Called when Azure function executes `context.done()`
 * @return {Context} The context object
 */
export const mockContext: any = (handler: ContextHandlerFunction) => {
  return {
    bindings: {},
    done: function done() {
      handler(this);

      return Promise.resolve({
        bindings: this.bindings,
        res: this.res,
      });
    },
    // TODO:ffl - Find way to implement support for both
    //             context.log() and context.log.info()
    log: {
      /* istanbul ignore next */
      error: function error(str: string) {
        // tslint:disable-next-line:no-console
        console.error(str);
      },
      info: function info(str: string) {
        // tslint:disable-next-line:no-console
        console.log(str);
      },
      verbose: function verbose(str: string) {
        // tslint:disable-next-line:no-console
        console.log(str);
      },
      warn: function warn(str: string) {
        // tslint:disable-next-line:no-console
        console.warn(str);
      },
    },
    res: {
      body: '',
      status: 200, // If not specified by function, default to 200
    },
  };
};
