import {AuthApi} from './auth';
import {CounterApi} from './counter';
import {UserProfileApi} from '@app/services/api/userProfile';

export class ApiService implements IService {
  private inited = false;

  counter: CounterApi;
  auth: AuthApi;
  userProfile: UserProfileApi;

  constructor() {
    this.counter = new CounterApi();
    this.auth = new AuthApi();
    this.userProfile = new UserProfileApi();
  }

  init = async (): PVoid => {
    if (!this.inited) {
      // your code ...

      this.inited = true;
    }
  };
}
