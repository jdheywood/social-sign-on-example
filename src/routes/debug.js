'use strict';

import alert from '../utils/alert';
import appConfig from '../../config/appConfig.json';
import connect from 'connect-ensure-login';
import email from '../utils/email';

/**
 * Debug routes, to assist during development
 * @module routes/debug
 * @param {object} app - the express application instance
 */
module.exports = app => {

  /**
   * Throw an error, to test our error route catches it
   */
  /* jshint unused: vars */
  app.get('/throw', (req, res) => {
    throw new Error('Have an error then');
  });

};
