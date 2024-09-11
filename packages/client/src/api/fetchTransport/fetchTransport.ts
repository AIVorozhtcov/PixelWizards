import { IMETHOD, URLS } from '../../constants/apiConstants';
import { APIMethod, BaseAPIConfig, Options } from '../../types';
import { queryStringify } from '../../utils/queryStringify';

export default class FetchTransport {
  private corePath: string;

  constructor(baseUrl: BaseAPIConfig['baseUrl'] = URLS.base, path = '') {
    this.corePath = baseUrl + path;
  }

  get: APIMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: IMETHOD.GET });
  };

  post: APIMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: IMETHOD.POST });
  };

  put: APIMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: IMETHOD.PUT });
  };

  private request: APIMethod = (url, options = { method: IMETHOD.GET }) => {
    const {
      method,
      data = {},
      headers = {},
      withCredentials: credentials = 'include',
      signal,
    } = options as Options & { headers: Record<string, string> };

    if (method === 'GET') {
      const correctedUrl = new URL(
        this.corePath + url + queryStringify(data as Record<string, string>)
      );

      return fetch(correctedUrl.href, {
        method,
        headers,
        credentials,
        signal,
      });
    }

    const body = data instanceof FormData ? data : JSON.stringify(data);

    return fetch(this.corePath + url, {
      method,
      headers,
      body,
      credentials,
      signal,
    });
  };
}
