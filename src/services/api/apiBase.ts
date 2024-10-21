export class ApiBase {
  executeRequest = async ({
    uri,
    method,
    requestBody,
  }: {
    uri: string;
    method: string;
    requestBody?: any;
  }): Promise<any> => {
    const requestUrl = this.getDomain() + uri;
    const response = await fetch(requestUrl, {
      method,
      body: requestBody,
      headers: {'Content-Type': 'application/json'},
    });
    const jsonResponse: any = await response.json();
    return jsonResponse;
  };

  getDomain() {
    return 'http://locahost:8081';
  }
}
