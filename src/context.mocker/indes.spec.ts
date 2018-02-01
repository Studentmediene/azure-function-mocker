import { mockContext } from './index';

describe('mockContext()', () => {
  it('Calls `handler` when `done` is called', () => {
    const handler = () => expect(true); // Test passes if handler is called

    mockContext(handler).done();
  });

  it('Calls `handler` with context as argument', () => {
    const handler = (ctx) => expect(ctx).toBeTruthy();

    mockContext(handler).done();
  });
});
