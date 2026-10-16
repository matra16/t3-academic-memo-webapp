/* STAGING ONLY - no school identity data or server credentials.
 * Client validation improves UX; the backend MUST repeat every check.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.T3Pin6Rules = api;
})(typeof window !== 'undefined' ? window : {}, function () {
  'use strict';
  const weak = new Set(['000000','111111','222222','333333','444444','555555',
    '666666','777777','888888','999999','123456','654321','012345','123123']);
  function normalizePin(value) {
    return String(value == null ? '' : value).replace(/[๐-๙]/g, function (char) {
      return String(char.charCodeAt(0) - 0x0E50);
    }).trim();
  }
  function validPin(value) { return /^[0-9]{6}$/.test(normalizePin(value)); }
  function validNewPin(value) {
    const pin = normalizePin(value);
    return /^[0-9]{6}$/.test(pin) && !weak.has(pin);
  }
  function validUsername(value) {
    const v = String(value == null ? '' : value).trim();
    return /^[A-Za-z0-9._-]{3,64}$/.test(v);
  }
  return Object.freeze({ normalizePin, validPin, validNewPin, validUsername });
});
