import { getInfo } from '../src/ele';
var expect = require('chai').expect;

describe('获取电量信息测试', function () {
  it('getInfo是个函数', function () {
    expect(getInfo).to.be.instanceOf(Function);
  });
  it('正确返回', function () {
    var dormitory = '090230'
    getInfo(dormitory)
      .then(data => {
        expect(data).to.be.instanceOf(Object)
        expect(data.dormitory).to.be.equal(dormitory)
      })
  });
  it('错误返回的是字符串', function () {
    getInfo('093333545')
      .then()
      .catch(err => {
        expect(err).to.be.instanceOf(String)
      })
  });
});