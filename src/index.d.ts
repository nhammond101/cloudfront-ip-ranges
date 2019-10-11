export interface IService {
  ip_prefix: string;
  region: string;
  service: string;
}

export interface IServicePrefix {
  prefixes: IService[];
}
