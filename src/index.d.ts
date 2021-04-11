export interface IService {
  // eslint-disable-next-line camelcase
  ip_prefix: string;
  region: string;
  service: string;
}

export interface IServicePrefix {
  prefixes: IService[];
}
