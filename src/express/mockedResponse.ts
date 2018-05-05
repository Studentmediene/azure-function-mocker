export default class MockedResponse {
  public data: any = null;
  public code: number = 500;
  public header: any = {
    'content-type': 'application/json',
  };

  public send(data: any) {
    this.data = data;

    if (typeof data === 'object') {
      this.header['content-type'] = 'application/json';
    }
  }

  public status(status: number) {
    this.code = status;
  }
}
