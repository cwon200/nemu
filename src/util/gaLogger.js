'use strict';
import Config from '../config/Config';

const ga = function() {};

class GaLogger {
  constructor() {
    ga('create', Config.GA.ID, 'auto');
    ga('set', 'appName', Config.GA.APP_NAME + '-' + Config.APPLICATION_PHASE);
    ga('set', 'appVersion', Config.APPLICATION_VERSION);
  }

  sendScreenView(_screen_name) {
    if (_screen_name) {
      ga('send', 'screenview', {
        screenName: _screen_name,
      });
      // eslint-disable-next-line
      console.log(
        '%c[Google Analytics] Send PageView - %s',
        'background: #e2514d; color: #fff',
        _screen_name
      );
    }
  }

  sendEvent(_action, _label, _customDimension) {
    if (_action && _label) {
      let customDimension = {};
      const defaultCustomDimension = {};

      if (_customDimension) {
        customDimension = {
          ...defaultCustomDimension,
          ..._customDimension,
        };
      } else {
        customDimension = defaultCustomDimension;
      }

      ga(
        'send',
        'LINKDeveloper',
        Config.GA.CATEGORY,
        _action,
        _label,
        customDimension
      );
      // eslint-disable-next-line
      // console.log(
      //   '%c[Google Analytics] Send Event - %s %s',
      //   'background: #e2514d; color: #fff',
      //   _action,
      //   _label,
      //   customDimension
      // );
    }
  }
}

const gaLogger = new GaLogger();
export default gaLogger;
