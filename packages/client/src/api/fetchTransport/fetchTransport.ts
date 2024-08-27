import { queryStringify } from '../../utils/queryStringify';

export type Path = `/${string}` | '';
export type Headers = { extends?: boolean } & Record<string, string | boolean>;

export const IMETHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

type MethodKeys = typeof IMETHOD[keyof typeof IMETHOD];

export interface BaseAPIConfig {
  path?: Path;
  baseUrl?: string;
}

export interface Options {
  method?: MethodKeys;
  headers?: Headers;
  withCredentials?: RequestCredentials;
  signal?: AbortSignal;
  data?: Record<string, unknown> | FormData;
}

export type APIMethod = (
  endpoint: Path | URL,
  options?: Options
) => Promise<Response>;

export default class FetchTransport {
  private corePath: string;

  constructor(baseUrl = 'https://ya-praktikum.tech/api/v2', path = '') {
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
