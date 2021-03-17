import * as FS from 'fs';
import { logger as _logger } from '@nrwl/devkit';

export function loadJson(p: string): any {
  return JSON.parse(FS.readFileSync(p, { encoding: 'utf-8'}));
}

export function saveJson(p: string, data: any): void {
  FS.writeFileSync(p, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
}

class Logger {

  get indentCount(): number { return this._track.length; }

  private _space = '  ';
  private _track: string[] = [];
  private _cached = '';

  constructor(private logger: typeof _logger) { }

  indent(): Logger {
    this._track.push(this._space);
    this._cached += this._space;
    return this;
  }

  outdent(): Logger {
    this._track.pop();
    this._cached = this._track.join('');
    return this;
  }

  warn(s: any): Logger { this.logger.warn(this._cached + s); return this; }

  error(s: any): Logger { this.logger.error(this._cached + s); return this; }

  info(s: any): Logger { this.logger.info(this._cached + s); return this; }

  log(...s: any[]): Logger {
    s.forEach( t => this.logger.info(this._cached + t) );
    return this;
  }

  debug(...s: any[]): Logger {
    s.forEach( t => this.logger.debug(this._cached + t) );
    return this;
  }

  fatal(...s: any[]): Logger {
    s.forEach( t => this.logger.fatal(this._cached + t) );
    return this;
  }
}

export const logger = new Logger(_logger);
