import request from 'request'
import cheerio from 'cheerio'
import { getCost } from './utils'

let req = request.defaults({ jar: true })
let j = request.jar()

let getInfo = function (dormitory) {
  return new Promise(function (reslove, reject) {
    let options = {
      method: 'POST',
      uri: 'http://222.204.3.210/ssdf/Account/LogOn?ReturnUrl=%2fssdf%2fEEMQuery%2fEEMBalance',
      form: {
        'UserName': dormitory
      },
      jar: j
    };

    req(options, (err, res, body) => {
      if (res.statusCode === 302) {
        var cookie_string = j.getCookieString(options.uri)
        let eleOptions = {
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
        }
        req(eleOptions, (err, res, body) => {
          let $ = cheerio.load(body);
          let monthCost = getCost($('tr')[1].children[3].children[0].data);
          let money = getCost($('tr')[2].children[3].children[0].data);
          let eletricity = getCost($('tr')[3].children[3].children[0].data);
          reslove({
            dormitory,
            monthCost,
            money,
            eletricity
          })
        })
      } else {
        reject('寝室号错误。格式为：楼栋号+楼层号+房间号，不足两位的均在前面补零。如：010101')
      }
    })
  })
};

export {
  getInfo
}