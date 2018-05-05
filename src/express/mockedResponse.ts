export default class MockedResponse {
  public data: any = null;
  public code: number = 200;
  public headers: any = {
    'content-type': 'application/json',
  };

  public send(data: any) {
    this.data = data;

    if (typeof data === 'object') {
      this.headers['content-type'] = 'application/json';
    }
  }

  public status(status: number) {
    this.code = status;
  }
}
