import { USER_PATHS } from '../../constants/apiConstants';
import { Profile } from '../../types/types';
import BaseApi from './baseApi';

type Data = Record<string, string>;

class GeneralApi extends BaseApi {
  constructor() {
    super();
  }

  async signup(data: Data) {
    const response = await this.post('/auth/signup', {
      data,
    });

    const responseData = await response.json();

    return responseData as { id: number };
  }

  async signin(data: Data) {
    const response = await this.post('/auth/signin', {
      data,
      withCredentials: 'include',
    });

    return response.status === 200;
  }

  async userInfo() {
    const response = await this.get('/auth/user', {
      withCredentials: 'include',
    });

    const responseData = await response.json();

    return responseData as Profile;
  }

  async updateUserProfile(data: Data) {
    const response = await this.put(USER_PATHS.updateProfile, {
      data,
    });

    const responseData = await response.json();

    return responseData as Profile;
  }

  async updatePassword(data: Data) {
    const response = await this.put(USER_PATHS.updatePassword, {
      data,
    });

    const responseData = await response.json();

    return responseData;
  }

  async updateUserAvatar(data: FormData) {
    const response = await this.put(USER_PATHS.updateAvatar, {
      data,
    });

    const responseData = await response.json();

    return responseData as Profile;
  }
}

const generalAPI = new GeneralApi();

export default generalAPI;
