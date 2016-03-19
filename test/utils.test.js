import { getCost } from '../src/utils';
var expect = require('chai').expect;

describe('获取度数与余额', function () {
  it('整数余额', function () {
    expect(getCost('152')).to.be.equal('152');
  });
  it('小数余额', function () {
    expect(getCost('152.148')).to.be.equal('152.148');
  });
  it('负数整数余额', function () {
    expect(getCost('-152')).to.be.equal('-152');
  });
   it('负数小数余额', function () {
    expect(getCost('-152.148')).to.be.equal('-152.148');
  });
});