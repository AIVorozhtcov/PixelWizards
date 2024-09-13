import { APIMethod, BaseAPIConfig, Headers, Options } from '../../types';
import FetchTransport from './fetchTransport';

export default abstract class BaseApi {
  private http: FetchTransport;
  private defaultHeaders: Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(config?: BaseAPIConfig) {
    this.http = new FetchTransport(config?.baseUrl, config?.path);
  }

  private checkOptions(installedOptions?: Options) {
    const options = installedOptions ?? {};

    options.headers = installedOptions?.headers ?? this.defaultHeaders;

    if (installedOptions?.headers?.extends) {
      options.headers = {
        ...this.defaultHeaders,
        ...options.headers,
      };
    }

    return options as Options;
  }

  protected post: APIMethod = async (endpoint, options) => {
    const response = await this.http.post(endpoint, this.checkOptions(options));

    return response;
  };

  protected get: APIMethod = async (endpoint, options) => {
    const response = await this.http.get(endpoint, this.checkOptions(options));

    return response;
  };

  protected put: APIMethod = async (endpoint, options) => {
    const response = await this.http.put(endpoint, this.checkOptions(options));

    return response;
  };

  protected delete: APIMethod = async (endpoint, options) => {
    const response = await this.http.delete(
      endpoint,
      this.checkOptions(options)
    );

    return response;
  };
}
