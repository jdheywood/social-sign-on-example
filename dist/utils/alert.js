'use strict';

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _slackNode = require('slack-node');

var _slackNode2 = _interopRequireDefault(_slackNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slack = new _slackNode2.default();

/**
 * Map of slack channels for use when alerting, mapped by alert type, use type as key to get string of channel name
 * @type {{profile: string, login: string, registration: string, forgotten: string, unknown: string}}
 */
var ChannelMap = {
  participation: '#assessment-tool-alert',
  login: '#assessment-tool-alert',
  registration: '#assessment-tool-alert',
  forgotten: '#assessment-tool-alert',
  error: '#assessment-tool-alert',
  unknown: '#assessment-tool-alert'
};

/**
 * Map of slack emojis for use when alerting, mapped by type, use type as key to get string of emoji
 * @type {{profile: string, login: string, registration: string, forgotten: string, content: string, error: string, unknown: string}}
 */
var EmojiMap = {
  participation: ':bust_in_silhouette:',
  login: ':bust_in_silhouette:',
  registration: ':e-mail:',
  forgotten: ':e-mail:',
  content: ':warning:',
  error: ':fire:',
  unknown: ':ghost:'
};

/**
 * Alert utility, for sending of application alerts to slack
 * @module utils/alert
 */
module.exports = {

  /**
   *
   * @param {string} type - the type of alert to send, used to determine channel and emoji
   * @param {string} message - the actual message to show in the alert
   */
  send: function send(type, message) {
    slack.setWebhook(_environment2.default.getSlackWebHookUrl());
    /*jshint camelcase: false */
    slack.webhook({
      channel: this.getChannel(type),
      username: 'assessmentbot',
      icon_emoji: this.getEmoji(type),
      text: message
    }, function (err, response) {
      console.log(response);
    });
  },


  /**
   *
   * @param {string} type - the type of alert
   * @returns {string} channel - the channel to alert to
   */
  getChannel: function getChannel(type) {
    var channel = ChannelMap[type];
    return !!channel ? channel : ChannelMap['unknown'];
  },


  /**
   *
   * @param {string} type - the type of alert
   * @returns {string} emoji - the emoji to alert with
   */
  getEmoji: function getEmoji(type) {
    var emoji = EmojiMap[type];
    return !!emoji ? emoji : EmojiMap['unknown'];
  }
};