'use strict';
import Config from '../config/Config';

const gtag = function() {};

class GtagLogger {
  constructor() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
    gtag('js', new Date());
    gtag('config', Config.GA.ID);
  }

  sendScreenView(name, path) {
    gtag('config', Config.GA.ID, {
      page_title: name,
      page_path: path,
    });
  }
}

const gtagLogger = new GtagLogger();
export default gtagLogger;
