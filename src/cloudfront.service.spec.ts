import { CloudfrontService } from './cloudfront.service';
jest.setTimeout(20000);
describe('Cloudfront service', () => {
  let service: CloudfrontService;
  beforeEach(() => {
    service = new CloudfrontService();
  });

  describe('getJSON', () => {
    test('should return successfully', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const actual = await service.getJSON();
      return expect(actual.prefixes[0].ip_prefix).toBeTruthy();
    });
  });

  describe('getIpRange', () => {
    test('should return successfully', async () => {
      const actual = await service.getIpRange();
      return expect(actual[0]).toBeTruthy();
    });
  });
});
