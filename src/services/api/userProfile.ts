export class UserProfileApi {
  login = async (): Promise<any> => {
    console.log('start PickTB login');
    const response = await fetch('http://locahost:8081', {
      method: 'POST',
      body: JSON.stringify({countryCode: '853', smsNumber: '123456', password: '123'}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  };
}
