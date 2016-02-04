import {Injectable} from 'angular2/core';

import {AppConfig} from './app-config.service';
import {Console} from './console.service';

@Injectable()
export class Log {

  constructor(private logger: Console) {}
  
  // out
  public o(msg: string) {
    
    if (AppConfig.DEBUG.LEVEL_4) {
      this.logger.log(msg);  
    }
  }
  
  // error
  public error(err: any) {
    if (AppConfig.DEBUG.LEVEL_4 || AppConfig.DEBUG.LEVEL_3) {
      this.logger.error(err);  
    }
  }
  
  // warn
  public warn(err: any) {
    if (AppConfig.DEBUG.LEVEL_4 || AppConfig.DEBUG.LEVEL_2) {
      this.logger.warn(err);  
    }
  }
  
  // info
  public info(err: any) {
    if (AppConfig.DEBUG.LEVEL_4 || AppConfig.DEBUG.LEVEL_1) {
      this.logger.info(err);  
    }
  }

}
