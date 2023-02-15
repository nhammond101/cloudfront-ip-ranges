import { bold, cyan, red } from 'chalk';
import * as debug from 'debug';

const colours = {
  debug: cyan,
  info: bold.cyan,
  warn: red,
  error: bold.red,
};

export class Logger {
  private readonly _info: debug.IDebugger;
  private readonly _debug: debug.IDebugger;
  private readonly _error: debug.IDebugger;
  private readonly _warn: debug.IDebugger;

  constructor(namespace?: string) {
    this._info = debug(`cloudfront-ip-range:${namespace}:info`);
    this._debug = debug(`cloudfront-ip-range:${namespace}:debug`);
    this._error = debug(`cloudfront-ip-range:${namespace}:error`);
    this._warn = debug(`cloudfront-ip-range:${namespace}:warn`);
  }

  public info(...args: unknown[]): void {
    this._info(colours.info(args[0]), ...args.splice(1));
  }

  public debug(...args: unknown[]): void {
    this._debug(colours.debug(args[0]), ...args.splice(1));
  }

  public warn(...args: unknown[]): void {
    this._warn(colours.warn(args[0]), ...args.splice(1));
  }

  public error(...args: unknown[]): void {
    this._error(colours.error(args[0]), ...args.splice(1));
  }
}
