import {ApiService} from '@app/services/api/index';

export class CacheableApiService {
  private api: ApiService;
  private userProfile: any;

  constructor() {
    this.api = new ApiService();
    this.userProfile = null;
  }

  getUserProfile = async (callBack: any = (response: any) => {}) => {
    if (this.userProfile) {
      console.log('Cache Hit');
    } else {
      console.log('Cache Miss');
      const result: any = await this.api.userProfile.login();
      this.userProfile = result;
    }
    callBack(this.userProfile);
    return this.userProfile;
  };
}
