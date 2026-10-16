'use strict';
const assert = require('node:assert/strict');
const test = require('node:test');
const rule = require('./pin6-rules.js');

test('exact six digits and Thai normalization', () => {
  for (const v of ['123456','000000','654321','๐๑๒๓๔๕']) assert.equal(rule.validPin(v),true);
  for (const v of ['','12345','1234567','12x456','-12345','１２３４５６']) assert.equal(rule.validPin(v),false);
  assert.equal(rule.normalizePin(' ๑๒๓๔๕๖ '),'123456');
});
test('common default cannot become permanent PIN', () => {
  for(const v of ['123456','654321','000000','111111','012345','123123']) assert.equal(rule.validNewPin(v),false);
  for(const v of ['827405','608291']) assert.equal(rule.validNewPin(v),true);
});
test('username field is normalized but not identity proof', () => {
  assert.equal(rule.validUsername('teacher_001'),true);
  for(const v of ['ab','','teacher space','admin@school.ac.th','../path','สมชาย']) assert.equal(rule.validUsername(v),false);
});
