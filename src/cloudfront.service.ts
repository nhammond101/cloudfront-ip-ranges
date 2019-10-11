import { Application } from 'express';
import https from 'https';
import { Logger } from './logger';
import { IServicePrefix } from './index.d';

export class CloudfrontService {
  private readonly _logger: Logger;

  constructor(private _apiUrl: string = 'https://ip-ranges.amazonaws.com/ip-ranges.json') {
    this._logger = new Logger('CloudfrontIpService');
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  private async getJSON() {
    return new Promise<IServicePrefix>((resolve, reject) => {
      https.get(this.apiUrl, (res) => {
        let body: string = '';

        res.on('data', (data) => {
          body += data;
        });

        res.on('end', () => {
          // @ts-ignore
          resolve(body.trim().split('\n'));
        });
      })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  public async updateIPs(): Promise<string[]> {
    const ips: string[] = [];
    try {
      const results = await this.getJSON();
      ips.push(...results.prefixes.filter((p) => p.service === 'CLOUDFLARE').map(({ ip_prefix }) => ip_prefix));
    }
    catch (e) {
      this._logger.error(e);
    }

    return ips;
    // return Promise.all(
    //   Object.keys(this.apiUrl).map(async (key) => {
    //     return this.getJSON()
    //       .then((result) => {
    //         return [key, result];
    //       });
    //   }),
    // )
    //   .then((results: IServicePrefix[]) => {
    //     results.forEach((ipSet: string) => {
    //       ips.push(ipSet);
    //     });
    //
    //     // if (options.versioned) {
    //     //   return ips;
    //     // }
    //     // else {
    //     return Object.values(ips).reduce((accu, x) => accu.concat(x));
    //     // }
    //   });
  }

  public updateTrustProxy(expressApp: Application) {
    return this.updateIPs()
      .then((ips: string[]) => {
        expressApp.set('trust proxy', ['loopback', ...ips]);
      });
  }
}
