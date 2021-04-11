import { Application } from 'express';
import * as https from 'https';
import { Logger } from './logger';
import { IServicePrefix } from './index.d';

export class CloudfrontService {
  private readonly _logger: Logger;

  constructor(
    private _apiUrl: string = 'https://ip-ranges.amazonaws.com/ip-ranges.json'
  ) {
    this._logger = new Logger('CloudfrontIpService');
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  private async getJSON() {
    return new Promise<IServicePrefix>((resolve, reject) => {
      https
        .get(this.apiUrl, (res) => {
          let body = '';

          res.on('data', (data) => {
            body += data;
          });

          res.on('end', () => {
            resolve(JSON.parse(body));
          });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  public async getIpRange(service = 'CLOUDFRONT'): Promise<string[]> {
    const ips: string[] = [];
    try {
      const results = await this.getJSON();
      ips.push(
        ...results.prefixes
          .filter((p) => p.service === service)
          .map(({ ip_prefix }) => ip_prefix)
      );
    } catch (e) {
      this._logger.error(e);
    }

    return ips;
  }

  public async updateTrustProxy(expressApp: Application) {
    const ips = await this.getIpRange();

    expressApp.set('trust proxy', [
      'loopback',
      'linklocal',
      'uniquelocal',
      ...ips,
    ]);
  }
}
