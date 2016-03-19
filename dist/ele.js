'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfo = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var req = _request2.default.defaults({ jar: true });
var j = _request2.default.jar();

var getInfo = function getInfo(dormitory) {
  return new Promise(function (reslove, reject) {
    var options = {
      method: 'POST',
      uri: 'http://222.204.3.210/ssdf/Account/LogOn?ReturnUrl=%2fssdf%2fEEMQuery%2fEEMBalance',
      form: {
        'UserName': dormitory
      },
      jar: j
    };

    req(options, function (err, res, body) {
      if (res.statusCode === 302) {
        var cookie_string = j.getCookieString(options.uri);
        var eleOptions = {
          method: 'GET',
          uri: 'http://222.204.3.210/ssdf/EEMQuery/EEMBalance',
          headers: {
            'Host': '222.204.3.210',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:45.0) Gecko/20100101 Firefox/45.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            'Referer': 'http://222.204.3.210/ssdf/Account/LogOn?ReturnUrl=%2fssdf%2fEEMQuery%2fEEMBalance',
            'Cookie': cookie_string,
            'Connection': 'keep-alive'
          }
        };
        req(eleOptions, function (err, res, body) {
          var $ = _cheerio2.default.load(body);
          var monthCost = (0, _utils.getCost)($('tr')[1].children[3].children[0].data);
          var money = (0, _utils.getCost)($('tr')[2].children[3].children[0].data);
          var eletricity = (0, _utils.getCost)($('tr')[3].children[3].children[0].data);
          reslove({
            dormitory: dormitory,
            monthCost: monthCost,
            money: money,
            eletricity: eletricity
          });
        });
      } else {
        reject('寝室号错误。格式为：楼栋号+楼层号+房间号，不足两位的均在前面补零。如：010101');
      }
    });
  });
};

exports.getInfo = getInfo;