import { SbErrorEvent, SbErrorHandler, SbMessageErrorEvent } from '../../../src/lib/error-handling';

class TestErrorHandler extends SbErrorHandler {
  lastError: SbErrorEvent;
  lastMessageError: SbMessageErrorEvent;

  async onError(event: SbErrorEvent) {
    this.lastError = event;
  }

  async onMessageError(event: SbMessageErrorEvent) {
    this.lastMessageError = event;
  }

}

describe('@pebula/nesbus', () => {
  it('apply error interface', () => {
    const handler = new TestErrorHandler();
    const error = new SbErrorEvent('verify', {} as any, new Error())

    handler.onError(error);
    expect(handler.lastError).toBe(error);

    handler.onMessageError(error);
    expect(handler.lastMessageError).toBe(error);
  });
});
