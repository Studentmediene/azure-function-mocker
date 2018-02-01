import { mockContext, MockedContext } from '../context.mocker';

/**
 * Mocks Azure functions locally, with the most common input and output bindigs,
 * to be used in testing.
 *
 * NOTE: This does not mock database or HTTP connections. This is the responsebility of
 * our testing library.
 * @author Fredrik F. Lindhagen
 */
export default class FunctionMocker {

  // tslint:disable-next-line:ban-types
  protected func: Function;
  protected config: object;

  /**
   *
   * @param {function} func A valid Azure Function to mock
   * @param {object} config Additional configuration to add to the mocker
   */
  constructor(func: any, config = {}) {

    this.func = func;
    this.config = config;

    this.run = this.run.bind(this);
  }

  /**
   * Exectures the mocked function,
   * and listens for context.done() or Promise.resolve(),
   * before it completes.
   * @param {array} inputBindings
   * @return {Promise} Resolves when execution completed without any problems.
   */
  public run(...inputBindings: any[]): Promise<any> {
    return new Promise((rsv: any, rr: any) => {
      // Creates a mocked context, and setup callback if function uses
      // context.done()
      const context: MockedContext = mockContext((ctx: MockedContext) => {
        if (!ctx.res.status) {
          ctx.res.status = 200;
        }

        rsv(ctx);
      });

      try {
        // Run function
        const f = this.func(context, ...inputBindings);

        // Catch Azure Functions which returns a Promise
        if (f && typeof f.then === 'function') {
          f
            .then(() => {
              if (!context.res.status) {
                context.res.status = 200;
              }

              rsv(context);
            })
            .catch((err: Error) => rr(err));
        }
      } catch (error) {
        rr({ error, context });
      }
    });
  }
}
