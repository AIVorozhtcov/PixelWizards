import {
  AUTH_PATHS,
  USER_PATHS,
  OAUTH_PATHS,
} from '../../constants/apiConstants';
import { FormAvatarType, OauthSignin, RedirectUri } from '../../types/types';
import {
  ErrorSchema,
  SignUpSchema,
  UserInfoSchema,
  ServiceIdSchema,
} from '../../types/validationSchemas';
import resultFromSchema from '../../utils/resultFromSchema';
import BaseApi from './baseApi';

type Data = Record<string, string | null>;

class GeneralApi extends BaseApi {
  constructor() {
    super();
  }

  async signup(data: Data) {
    const response = await this.post(AUTH_PATHS.signup, {
      data,
    });

    return resultFromSchema(SignUpSchema, ErrorSchema, response);
  }

  async signin(data: Data) {
    const response = await this.post(AUTH_PATHS.signin, {
      data,
      withCredentials: 'include',
    });

    if (response.status === 200) {
      return true;
    } else {
      const error = ErrorSchema.parse(await response.json());
      return error;
    }
  }

  async userInfo() {
    const response = await this.get(AUTH_PATHS.getUserInfo, {
      withCredentials: 'include',
    });

    return resultFromSchema(UserInfoSchema, ErrorSchema, response);
  }

  async updateUserProfile(data: Data) {
    const response = await this.put(USER_PATHS.updateProfile, {
      data,
    });

    return resultFromSchema(UserInfoSchema, ErrorSchema, response);
  }

  async updatePassword(data: Data) {
    const response = await this.put(USER_PATHS.updatePassword, {
      data,
    });

    if (response.status === 200) {
      return true;
    } else {
      return ErrorSchema.parse(await response.json());
    }
  }

  async updateUserAvatar(data: FormAvatarType) {
    const response = await this.put(USER_PATHS.updateAvatar, {
      data,
    });

    return resultFromSchema(UserInfoSchema, ErrorSchema, response);
  }

  async getClientId(data: RedirectUri) {
    const response = await this.get(OAUTH_PATHS.getServiceId, {
      data,
    });

    return resultFromSchema(ServiceIdSchema, ErrorSchema, response);
  }

  async oauthSignin(data: OauthSignin) {
    const response = await this.post(OAUTH_PATHS.signIn, {
      data,
    });

    if (response.status === 200) {
      return true;
    } else {
      return ErrorSchema.parse(await response.json());
    }
  }

  async logout() {
    await this.post(AUTH_PATHS.logout);
  }
}

const generalAPI = new GeneralApi();

export default generalAPI;
